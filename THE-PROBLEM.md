# The problem

* anonymous verified endpoints may not make sense, since no traffic can be traced to your personal identity and you can just publish your private keys for everybody to act as "I'm 18 years old" and anonymous

* user wants Pornhub account, creates anonymous endpoint, signed by personal 18+ identity and asks for verification.
This anon endpoint can be used for complete traffic and nobody can see that @xy communicated with PH.
-> DATEX Request by anon endpoint includes section with signed PROXY endpoint (personal identity) DEFAULT behaviour to visit sites anonymous but tell service that you are actually your main account.

* The problem: We want to watch 18+ content without having PH to know that we are indeed @jonasstr. How can be proove?
* eID possible if PH provides cerificates (like governikus) -> can be sure that each person creates only a single account but is 18+ -> TL1 (must not be written to BC)
