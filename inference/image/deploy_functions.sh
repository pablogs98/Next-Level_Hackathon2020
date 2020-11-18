:#!/bin/bash

ibmcloud fn action delete NLHackation2020/inferencer_icu
ibmcloud fn action delete NLHackation2020/inferencer_death
ibmcloud fn package delete NLHackation2020
ibmcloud fn package create NLHackation2020
ibmcloud fn action create NLHackation2020/inferencer_icu --docker geizaguirreuoc/nlrepo:sklearn inferencer_icu.py --web true
ibmcloud fn action create NLHackation2020/inferencer_death --docker geizaguirreuoc/nlrepo:sklearn inferencer_death.py --web true

