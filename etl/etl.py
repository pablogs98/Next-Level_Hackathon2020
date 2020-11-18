import requests
import json
import cloudant
import pandas as pd
import numpy as np
import hashlib
from cloudant import Cloudant
from datetime import datetime, timedelta
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.model_selection import RandomizedSearchCV, train_test_split
from sklearn.svm import SVR

def main(args):
    url = args['url']
    res = requests.get(url)

    with open('covid.csv', 'wb') as csvf:
        csvf.write(res.content)
    
    df = pd.read_csv('covid.csv', parse_dates=['fecha'], usecols=['fecha', 'ccaa_iso', 'num_casos'])

    ccaas = df.ccaa_iso.unique()

    for ccaa in ccaas:
        print(ccaa)
        df_ccaa = df.loc[df.ccaa_iso == ccaa][['fecha', 'num_casos']].set_index('fecha')
        casos = df_ccaa
        casos_acum = casos.cumsum().rename(columns={'num_casos': 'num_casos_acum'})
        casos_array = casos_acum.to_numpy()
        days = np.asarray([i for i in range(len(casos))]).reshape(-1, 1)
        future_forcast = np.asarray([i for i in range(len(casos) + 100)]).reshape(-1, 1)
        X_train_confirmed, X_test_confirmed, y_train_confirmed, y_test_confirmed = train_test_split(days, casos_array, test_size=0.05, shuffle=False) 
        svm_confirmed = SVR(shrinking=True, kernel='poly',gamma=0.01, epsilon=1,degree=3, C=0.1)
        svm_confirmed.fit(X_train_confirmed, y_train_confirmed)
        svm_pred = svm_confirmed.predict(future_forcast)

        json_data = {}
        casos_json = json.loads(casos.to_json(date_format='iso'))
        casos_acum_json = json.loads(casos_acum.to_json(date_format='iso'))
        pred = {'svm_pred': {}}
        d = datetime(day=1, month=1, year=2020)
        for x in svm_pred:
            diso = d.isoformat(timespec='milliseconds')+'Z'
            pred['svm_pred'][diso] = x
            d = d + timedelta(days=1)
        json_data.update(casos_json)
        json_data.update(casos_acum_json)
        json_data.update(pred)

        client = Cloudant.iam(account_name=args['cloudant_username'], api_key=args['cloudant_apikey'], connect=True)
        covid_db = client['covid']

        partition = hashlib.md5(ccaa.encode('utf-8')).hexdigest()
        json_data['_id'] = '{}:{}'.format(partition, ccaa)
        covid_db.create_document(json_data)
