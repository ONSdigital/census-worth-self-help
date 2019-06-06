# Concourse CLI

    fly -t ci workers 
    fly -t ci volumes 
    fly -t ci containers
    fly -t ci builds
    fly -t ci abort-build -b 214 

# Logs

If jobs are hanging without messages in the console, then the ATC logs on the 
web pod may give some clues / errors.

    kubectl get pods
    kubectl logs -f concourse-web-75d5dcbcd8-fgvtn | grep error
    kubectl logs -f concourse-worker-0 | grep error
    kubectl logs -f concourse-worker-1 | grep error


You can also view GKE logs in google cloud console.

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