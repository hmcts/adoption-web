#!/bin/bash

repository=${1}
prNumber=${2}

# if [[ ${repository} != "service" && ${repository} != "ccd" && ${repository} != "camunda" ]]; then
#   echo "Supported repositories: service, ccd, camunda"
#   exit 1
# fi

if [ -z "$prNumber" ]; then
  echo "You need to provide pr number"
  exit 1
fi

namespace="adoption"
podsPrefix="${repository}-pr-${prNumber}"
echo "Clearing resources for PR: " ${podsPrefix}

helm list -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs helm uninstall -n ${namespace}
kubectl get deploy -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete deploy -n ${namespace}
kubectl get job -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete job -n ${namespace}
kubectl get statefulset -n ${namespace}| grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete statefulset -n ${namespace}
kubectl get svc -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete svc -n ${namespace}
kubectl get po -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete po -n ${namespace}
kubectl get secret -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete secret -n ${namespace}
kubectl get PodDisruptionBudget -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete PodDisruptionBudget -n ${namespace}
kubectl get ing -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete ing -n ${namespace}
kubectl get configmaps -n ${namespace} | grep ${podsPrefix} | awk '{print $1}' | xargs kubectl delete configmaps -n ${namespace}