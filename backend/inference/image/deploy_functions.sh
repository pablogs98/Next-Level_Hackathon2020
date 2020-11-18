:#!/bin/bash

ibmcloud fn action delete NLHackation2020/inferencer
# ibmcloud fn package delete NLHackation2020
# ibmcloud fn package create NLHackation2020
ibmcloud fn action create NLHackation2020/inferencer --docker geizaguirreuoc/nlrepo:sklearn inferencer.py --web true
