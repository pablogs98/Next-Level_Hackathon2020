import json
import hashlib
from cloudant import Cloudant


with open('cloudant_credentials.json', 'r') as cloudant_credentials_f:
    cloudant_credentials = json.loads(cloudant_credentials_f.read())

client = Cloudant.iam(account_name=cloudant_credentials['username'], api_key=cloudant_credentials['apikey'], connect=True)

covid_db = client['covid']

# with open('CT.json', 'r') as covid_json:
#     ct = json.loads(covid_json.read())

ccaa = 'CT'
partition = hashlib.md5(ccaa.encode('utf-8')).hexdigest()
doc_id = '{}:{}'.format(partition, ccaa)
# ct['_id'] = '{}:CT'.format(partition)
# covid_db.create_document(ct)

x = covid_db[doc_id]
print(x)