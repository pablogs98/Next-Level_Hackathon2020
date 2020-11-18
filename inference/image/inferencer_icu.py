import json
import pickle
import ibm_boto3
import ibm_botocore
import sklearn
import pandas as pd
import sys

def main(args) :
	msg="Null"
     
	keys = [ "sex", "patient_type", "intubed", "pneumonia", "age", "pregnancy", "diabetes", "copd", "asthma", "inmsupr", "hypertension", "other_disease", "cardiovascular", "obesity", "renal_chronic", "tobacco", "contact_other_covid", "covid_res", "icu" ]

	keys = list(set(keys) & set(args.keys()))
        
	args = { key:args[key] for key in keys }

	features_dict = { key:[value] for key, value in args.items() }
	user_profile = pd.DataFrame(features_dict)

	print(ibm_boto3.__version__)

	config = {
		'ibm_api_key_id' : 'HqjZ-aY5oQfrkI0cwNTMRMVTTRDv6JY-i6tCswcpiGvq',
		'ibm_service_instance_id' : '584a3f8b-4540-4c26-a6ac-cc319cc06c9e',
		'endpoint_url' : 'https://s3.private.eu.cloud-object-storage.appdomain.cloud',
		'Bucket' : 'nextlevelhackathon2020-donotdelete-pr-s9nsxj5fxjzk0j'
	}

	ibm_cos = ibm_boto3.resource("s3",
	             ibm_api_key_id=config['ibm_api_key_id'],
	             ibm_service_instance_id=config['ibm_service_instance_id'],
	             config=ibm_botocore.client.Config(signature_version="oauth"),
	             endpoint_url=config['endpoint_url'])

	stream_icu = ibm_cos.Object(config['Bucket'], 'model_icu.pickle').get()['Body']
	model_icu = pickle.loads(stream_icu.read())
	
	icu_value = model_icu.predict(user_profile)[0]

	return { 'body': { 'result':icu_value }}
	# return {"body":"<html><body><h3>{}</h3></body></html>".format(icu_value)}
