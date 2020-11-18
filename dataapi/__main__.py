import sys
import hashlib
import os
from cloudant import Cloudant

def main(args):
    print(args)
    print('------------')
    print(dict(os.environ))
    
    if args['__ow_method'] != 'get':
        return {'body': {'error': 'bad method'}, 'statusCode': 400}
    
    if 'ccaa' not in args:
        return {'body': {'error': 'missing `ccaa` param as url arg'}, 'statusCode': 400}
    
    client = Cloudant.iam(account_name=args['cloudant_username'],
                          api_key=args['cloudant_apikey'],
                          connect=True)
    covid_db = client[args['cloudant_db']]

    ccaa = args['ccaa']
    partition = hashlib.md5(ccaa.encode('utf-8')).hexdigest()
    doc_id = '{}:{}'.format(partition, ccaa)
    
    try:
        data = covid_db[doc_id]
        del data['_id']
        del data['_rev']
        response = {'body': data, 'statusCode': 200}
    except Exception as e:
        response = {'body': {'error': str(e)}, 'statusCode': 500}
    
    return response
