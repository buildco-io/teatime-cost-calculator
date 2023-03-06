# Assumptions

- Video Size Per Minute = 200MB.
- Growth Rate is Linear in worst case (realistically, as it will be exponential, the storage costs may be lower).
- A month has an average of 30 days.
- The email costs are negligible.
- One Kubernetes container can accommodate the computation power for 3000 people, spread-out through time (can accommodate around 500 users at the same time, provided most users aren’t uploading videos, which is a resource intensive task). Exact user usage patterns can only be known after a while of usage.
- Database storage per user will be 2MB (may need to increase over time).
- We will use the USD42 Kubernetes nodes and will not switch to larger Kubernetes nodes which will potentially have more savings, though the number of users that can be accommodated per unit may vary.
- There will be much more users than large scale channels (at least 5-10x).
- Domain name and SSL certificate costs are additional.
- EXACT USER USAGE PATTERNS CAN ONLY BE KNOWN AFTER GATHERING EXTENSIVE DATA ON HOW THE USERS USE THE APP, AND THEREFORE EXACT COSTS MAY VARY.
