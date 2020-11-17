import pandas as pd
import numpy as np
import requests
import cloudant
import zipfile
from sklearn.model_selection import RandomizedSearchCV, train_test_split
from sklearn.svm import SVR

def main(args):
    url = args['url']

    res = requests.get(url)

    with open('catalunya_diari.zip', 'wb') as cat_data:
        cat_data.write(res.content)
    
    with zipfile.ZipFile('catalunya_diari.zip', 'r') as zip_ref:
        zip_ref.extractall('.')

    df = pd.read_csv('catalunya_diari.csv', delimiter=';', parse_dates=['DATA'], usecols=['DATA', 'CASOS_CONFIRMAT'])
    cat = df.groupby(['DATA']).sum().cumsum()

    cases = cat['CASOS_CONFIRMAT'].to_numpy()
    days = np.asarray([i for i in range(len(cases))]).reshape(-1, 1)
    future_forcast = np.asarray([i for i in range(len(cases) + 50)]).reshape(-1, 1)

    X_train_confirmed, X_test_confirmed, y_train_confirmed, y_test_confirmed = train_test_split(days, cases, test_size=0.05, shuffle=False) 
    svm_confirmed = SVR(shrinking=True, kernel='poly',gamma=0.01, epsilon=1,degree=3, C=0.1)
    svm_confirmed.fit(X_train_confirmed, y_train_confirmed)
    svm_pred = svm_confirmed.predict(future_forcast)

    print(svm_pred)


args = {'url': 'https://dadescovid.cat/static/csv/catalunya_diari.zip'}
main(args)



