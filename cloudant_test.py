import json
import hashlib
from cloudant import Cloudant


with open('cloudant_credentials.json', 'r') as cloudant_credentials_f:
    cloudant_credentials = json.loads(cloudant_credentials_f.read())

client = Cloudant.iam(account_name=cloudant_credentials['username'], api_key=cloudant_credentials['apikey'], connect=True)

covid_db = client['covid']

with open('CT.json', 'r') as covid_json:
    ct = json.loads(covid_json.read())

partition = hashlib.md5(b'CT').hexdigest()
ct['_id'] = '{}:CT'.format(partition)
covid_db.create_document(ct)