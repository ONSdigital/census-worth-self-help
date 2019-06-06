# Concourse CLI

   fly -t ci workers 
   fly -t ci volumes 
   fly -t ci containers

# Logs

    kubectl get pods
    kubectl logs -f concourse-web-75d5dcbcd8-fgvtn | grep error

Also view GKE logs in gcloud

# Persistent Worker volumes

    kubectl get pods,pvc
    kubectl exec -it concourse-worker-0 bash 
    kubectl exec -it concourse-worker-1 bash 
    
    cd /concourse-work-dir
    
# Webhooks

```
set -x WEBHOOK_TOKEN ...enter-token...
curl -v -X POST \
  "https://ci.worth.census-gcp.onsdigital.uk/api/v1/teams/main/pipelines/self-help-test/resources/census-worth-self-help-test/check/webhook?webhook_token=$WEBHOOK_TOKEN"  
``` 