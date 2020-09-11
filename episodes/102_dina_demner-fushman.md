---
title: "Dina Demner-Fushman"
hosts: ["Pradeep Dasigi","Waleed Ammar"]
guests: ["Dina Demnar-Fushman","Matt Garner"]
number: 102
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Garner" timestamp="">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Amar and Pradeep Tasigi.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

So, today our guest is Dina Demner Fushman who is investigator leading the IRN NLP research groups
in the Lister Hill National Center for Biomedical Communications at the national library of medicine
at national Institute of health. Welcome to the program, Dina.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Thank you.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

When we met a few months ago, I realized there is a lot of NLP work happening in NLM and I wanted
you to give us an overview of this work. So maybe could you start with just an overview of NLM and
the NLP related tools that your groups are working on.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Yes, thank you. So, NLM has an intramural research program as do the other NIH institutes. The goals
of these intramural research programs usually are to work on something that a university or a
private company will not be working on. Something that is either requiring a longer time than say a
grant cycle or something that is too daring to be funded, too exploratory, but is still needed. And
this is sort of our goal is to work in these areas. For the natural language processing, one of
these projects for example, is our OpenI project, which is now a service provided by the Lister Hill
center, but it all started about 10 15 years ago when we started thinking about searching images by
both image features and text queries and how do we do that? So my very first experience was because
I didn't know any better, is concatenate the image and text vectors and searching for these.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

And then we took it from there and now it's a service and we continue exploring. So that's an
example of that, something that the industry will not do and that the university might not consider
because you need a multidisciplinary group. And back then that was not that common. Another aspect
of the natural language processing research at NLM, is in support of these services, and of course,
the mission of the library, is to deliver information about biomedical issues that are needed by
clinicians at the point of service by people who are looking for their health conditions, by
researchers at the bench side that are working see for new drugs or new cancer pathways and how to
block them. So, to better deliver these services, we are also looking into tasks that are research
but will have some implications for the NLM services.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

An example of that is our medical text and extra, so to search a biomedical literature and the past,
you really needed an experienced human indexer to go into the article and find out the key terms and
back then the literature was searchable only by these key terms. Now of course we can index full
text, we can, of course, have the abstract but also the full text of the whole paper. So we ask the
question, are these index terms still relevant and should we continue the practice of assigning
these key terms? And the answer was that it is still very important. We have improved search
results. We also have different aspects of these terms used outside of retrieval purposes. For
example, to describe the landscape of the literature or profile of the researcher or see how
different biomedical areas interacted and how the literature based discovery. So, then the question
is how the literature is growing very fast and we have a very limited amount of indexers and how can
they index more efficiently being assisted by our approaches. So we have a medical text index set of
algorithms that extracts the most relevant terms, maps them to the control vocabulary, and then
presents to the indexers for their approval. So that's a sort of practice driven, very interesting
abstractive summarization research.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Absolutely. And one of the things I think is most unique in this work is that unlike a lot of the
work that happens in academia, PubMed, the tool of choice for most of the biomedical researchers and
clinicians when they're looking in the, in the biomedical research, which brings a lot of practical
considerations, right? So you have to keep the vocabulary up to date because there are a lot of
terms that come up every year and you have to make sure that documents are indexed relatively soon
because you don't want to wait for too long. You want people to be able to find papers that were
published recently. So how can you address these aspects and to what extent these are isolated from
research. I imagine there is a lot of practical considerations that are not necessarily research
focused. I'm curious to know how much effort do you put on, how do you do this activities?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Right. So, it's really a collaboration between the index section, the other research arm of the
national library of medicine and part of our one NLM intramural research program is the NCBI that
supports Pubmed. And there is a lot of engineering research recently in moving PubMed to the cloud
was very successful. And you're right, we want to have the articles indexed on time as our director
said "If indexing is so important, we should not have a backlog." And we did have a backlog. So what
happened this year, we looked into selectively indexed journals. So some journals are very broad. An
example would be Science and Nature. They publish articles on everything that also includes
biomedical articles. We only need to index those biomedical articles, but we don't know up front of
course, which ones are going to be of interest to PubMed and or indexers had to first look at these
articles and decide whether there should be an indexed or not, then put them into a different queue
for indexing and whatnot.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So we looked into it from the perspective of learning and we applied several different algorithms
and we found net we can very reliably say which 30% of the articles will be definitely out of scope
for PubMed and which 30% will be definitely in scope and should be indexed. And then of course there
is the middle where the algorithm is not sure whether it should or should not be index. So that will
continue going for that decision which pile does it go to. But what happened, we reduced the backlog
by 30,000 articles and going forward we basically are reducing the workload for that decision by
60-some percent. Another example of how that all works together is, so we are a research arm, we are
not supporting the day to day services. We gave the models and the algorithms to the NCBI group that
supports PubMed and that supports the tool that ingests information from the publishers and they
actually installed it at the point where the publishers are submitting for the selectively indexed
journals and the decision is made right there. Third, is automatically indexed as out of scope and
never goes through indexers. Another third just go straight to the indexers queue and then the
remaining third is going to be reviewed by someone to decide where to route it.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Thank you for explaining. I didn't realize that the separation in the groups and it's great that
you're able to work together because sometimes it's not always easy to set up a collaboration
between research groups and production groups.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Exactly.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

I think the transition of PubMed to the new algorithm was one example of that collaboration and
these new selectively indexed journals is another, and I hope we have more down the road because we
have the knowledge of what methods could be applied right away and for the production people to take
time and start exploring these area. It's not very efficient.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Totally. So, I imagine there are a lot of problems that you could be working on in this area because
it's very under studied. Right? I think within the NLP literature I feel like biomedical
applications and literature based applications are very understudied. So I'm wondering how do you
prioritize and decide which ones to focus on, what to prioritize among all the possible things that
you could be working on.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Right. Officially we have our board of scientific counselors, so this is in parallel to the peer
review committee. So when you are deciding to submit to your grant proposal, when you are at the
university it goes to say NLM or NSF and then the peer reviewer says will be, "yes, this is an
important problem and you should be working on it" or "No", or "You know, this is what's lacking."
So, the same role is played by the board of scientific counselors at the NIH institutes. So when we
have these sort of bottom up ideas, for example, the OpenI idea was bottom up, the imaging
researcher and I got together and we proposed it and then our board of scientific counselors said,
Oh, "That's a great idea, go and explore it," so we did. We also have, sometimes the idea is coming
top down because it is a priority for the library.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

For example, consumer health questions. We all understand that people now have completely changed
how they interact with their health providers. They first go online, they describe their symptoms,
they see what's available, what might they have, what kinds of treatments could they have and stuff
like that. Or, even if they're looking for lifestyle changes, they still go online first and then
they go to their provider with that information. And unfortunately either they use any of the major
search engines. Up until very recently, there was no thoughts about the trustworthiness of the
resources that are provided that actually I think when they interviewed people about how they valued
Yahoo answers, people were giving more stars to the longer answers. So it did not matter if the
answer was good or correct, but it was long. So, therefore it must be good. So, very often the
consumers do not have the background to judge if the advice they're getting is sound.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

That's why we started looking into providing answers just from the reliable sources. So one of the
reliable sources that NLM offers to the public is Medline Plus. This is specifically articles
written at the, I believe K eight level so that people can understand the health problems. And of
course the bulk of the content is coming from the institutes. So if it's an article about diabetes
that will be coming from the diabetes Institute written by leading scientists in the field. So that
was our director's goal was to answer the questions that are coming to NLM customer services posture
with these reliable information automatically. So that's how our consumer health question answering
project started.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Wonderful. This is really exciting. I didn't know about this and now I'm eager to go check it out
after we finish the recording because, oftentimes I go check some websites like for specific
symptoms and it very quickly goes way deeper than I can understand, which is fine, I think. It's
necessary for different people to open some information at different that is, which this is a very
clearly targeted website with high credibility.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

And we definitely need more of these. So, what was very interesting that the text retrieval
conference track had a decision's track in 2019 and when they were proposing and discussing this
track a year ago, I went to med discussion meeting and I said, "It looks like you're talking about
consumer health issues and I will be happy to participate." And they said "No, we want to broaden
the decisions to any decisions you make online." But then they ended up actually having, the
consumer health issues as the most burning ones and they will continue next year. And what's really
interesting that, so, we do have our biomedical informatics community and our BioNLP community and
even I would say bio information, retrieval community, but that interest came out of the open
domain. So it is really good to see that the interest is growing from the open domain researchers as
well.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Yeah. Just to be the case that many NLP and IR people would refrain from working in this area
because there is not enough data to work with. I think this is changing in part because of the
efforts that your group is putting into the problems.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So it's still a huge issue for clinical text. Right, and you're absolutely right. NIH had a lot to
do with the scientific literature becoming open or as open as possible. Everything that is funded by
NIH has to be openly provided in PubMed central. And that's why we saw so many good solutions and
decisions coming out of the community because the data are there but for the clinical text and for
clinical data we only have that mimic dataset and some other few smaller collections and I'm trying
to work with various organizations to see if they could release their data because I don't believe
that as I put it recently, we have to get computer science students working on the clinical data if
we wanted to see some progress.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="">

Can you explain what you mean by clinical data and how that's different from the Medline texts that
you described earlier?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Clinical notes is what you have in your electronic health record and even when you are visiting with
your family doctor you are an outpatient but there is still some kind of record and it's a mixture
of structured data and notes and very often we see that structured data does not give you the full
picture because the nuances are described in the notes and very often what's really important to
understanding the patient's case is in the notes and only in the notes. In terms of what is
developed for the biomedical literature experiences a huge drop in performance when you move to
clinical text is because the clinical text is so different. When people are writing their scientific
publications, they try to explain what's going on; it's structured, it's grammatical, very few
typos. When you work with clinical text, it's really the opposite. You have lots and lots of
abbreviations, lots of typos.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Very often we're looking at something, you know this, that patient have seen pneumonia or not. And
what we found in mimic notes is that sometimes it will just have some term like pneumonia and then
semi-colon and it means that it was some kind of a header, but we don't know if the patient has it
or not. In addition, very often the words are not enough. You really need to understand the whole
phrase or a combination of the words in the numbers. For example, the patient's fever was and then
it turns out of course the patient did not have a fever because the numbers are normal and very
often it is a copy paste issue. Often there are sort of table like structures that don't look like
tables, exactly but they don't look like text either.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

But at least, is it all electronic, right? You don't have to perform OCR on aggregate text.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

No, you still have to, in some cases, very often actually something that is electronic will be
printed out and given to the patient and then at the next location scanned in.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Okay. Right. So stepping back a little bit, when we think about bio NLP, I think of three distinct
categories. NLP for scientific and biomedical documents and then NLP for clinical applications
including clinical applications and decision support systems for clinicians and then NLP for health
consumers. And it seems like you work in all these areas. So, you mentioned the main challenge in
working on clinical applications has to do with the lack of data and also my understanding is that
also the lack of consistency across the data that's available because different systems collect data
in different formats in different granularities and so it becomes a lot harder to learn from one set
of data and then transfer it to use it in a different hospital that uses a different platform. What
about the other two categories? What do you see as like the key challenges in the other two areas
for health consumers and for understanding the scientific biomedical research?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So, for understanding research, we need to build a bigger picture. We are relatively descent on
understanding a given paper or solving a given task. For example, a couple of years ago there was
these big mechanism where they wanted to read the cancer literature and build a whole understanding
of the cancer pathways and where they can be interrupted and they were attempting to combine it with
the models that already exist. So I think the challenge for the literature right now is scaling up
to including other modalities, not just images but see genetic data and models, environmental data
and what else we can get and then building in big picture of health together out of these data
points. So, I think this is where we should be going with modeling for the literature. For the
clinical text, very often it is practical; we need these practical applications here in that
hospital.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

And I think the problem there is very often you don't need really new algorithms, sometimes very old
ones, Sometimes regular expressions work just fine. And it is practically very useful. And I think
the VA application has shown that they started detecting cancer one stage earlier when they applied
very simple algorithm. So these things I think also should be acknowledged and these are interesting
publications. So it's not necessarily you came up with some brilliant new method of understanding
clinical text, but if you have shown that you included it in the workflow and it actually helped the
patients, then I think it's equally interesting and then we're consumers. We have the problems when
the questions are very specific. Do you know any algorithm nowadays hopefully can answer what is
diabetes and what types of diabetes are there and what are the most common treatments for diabetes?
I don't believe that is relatively solved. But if a patient comes in with a very specific question
that can only be answered by maybe one paper in Pubmed or by some drug insert that speaks in the
language, that is very hard to understand. So there's a lot of work there A: understanding these
complex needs and B: finding the answers and see translating these answers so that the consumer can
understand these. Lots of work in all three areas remaining.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Absolutely. I talked recently to Asma Ben Abacha and learn about about the work that you guys are
doing to summarize the questions and also to focus on trusted sources when you're delivering the
answers. You have a tool that's kind of like in beta mode, I think now it's called CHiQA. I'd like
to give it a shout out. I think it's https://chiqa.nlm.nih.gov/. It's really interesting.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

And all comments are very welcome. So we had a community wide challenge here and we hope to have
another one next year or get the data to the community and get the community interested in expanding
these research area. There is some preliminary work on determining how trustworthy the source is,
how current it is. So all of these three, yes they're sort of separate, but they do come together a
lot because clinical decision support is merging the clinical text and the literature and for
consumers their questions are in lay language and we need to merge the lay resources and again, the
literature. And of course there is another area where doctors have questions that can be answered
only by EHR data. So that's another area of research that's very interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

AHR data?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So for example, you can ask what is the highest blood pressure that patient ever had. And of course
if you want to figure it out now, you will have to go into the electronic health record and pool all
the blood pressure measurements for that patient and then rank them somehow. So the goal is to do it
automatically.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Got it. To what extent do you think hospitals and medical providers are willing to incorporate these
methods? We know that most of our models ever had more than, like 98% accuracy. That's a very
generous, right? I don't know to what extent it's feasible or it'makes sense to incorporate any of
these methods in a hospital setting or the surgeon support setting in the medical environment.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So our indexers are a lot like the doctors. They will want to be absolutely sure that these 30% are
out of scope and these 30% have to go to the indexers. So I think if we develop the models where we
say, I'm dead sure this is this I'm dead sure this is that, and here you really have to look.
Because my model is really unsure about that. And very often when we'll look at these cases, well
people are also unsure, but we kind of have to make a decision in this case. So I think if we follow
these models, and of course it all depends on what you're trying to achieve, right? So if you're
looking for, to form a cohort for a retrospective study, then 99% is fine. It's a secondary use of
the data. So if, you know, if you did not include somehow that some of the patients into your
cohort, your conclusions will probably still be statistically significant. But if you are trying to
detect cancer earlier in the life system in these patients, then probably flagging everyone who
you're not very sure about is it better? So it really all depends on what you're trying to achieve.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="">

When you say the performance of the model is ninety nine percent, what kinds of test sets are you
talking about? Surely, applications here looking at are more critical than many of the other NLP
applications that most researchers look, right? So do you do anything special with how you make
these test sets, how you split your trained test sets or something.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So, I think what we do even again who the indexers, after we are done with the models using the
regular data sets. We take the data that is incoming that they would have had to evaluate anyway.
And then we ask them to evaluate the results specifically for that real life data. And they are
usually good about it. They're usually doing it and then they are more confident again and then they
will go and say, okay, go ahead and implement the system because I'm satisfied.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Yeah. And I imagine some applications are still far from this 99 or 98% so, I imagine things like
question answering for health consumer questions, which are very long and very complicated
questions. I imagine these would be a lot lower.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Absolutely. I think the best we have seen in question entailment recognition in that challenge. So
the idea of question entailment is, we have these frequently asked questions at NIH where the
specialists created ideal answers for these frequently asked questions. And very often the questions
that are sent to our customer services are entailed and then of course if we recognize that we can
just grab the perfect answer so that was the idea and the best results we've seen near were in the
eighties, I believe. So, yeah. We used to go, I have to say for medical text indexer, when you
describe the paper you have the heading which gives you the main point. For example, it will be
blood thinners and then there is a subheading that talks about the aspects of these blood thinners
in the paper. So for example it will be, I don't know, complications, is probably not the right
terms, but it's the idea that this is, this paper is about these complications.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

The human agreement on those is in the 60s and we developed an algorithm that is at human
performance right now, but what we are trying to do going forward is we work again with the indexers
to evaluate only the false positives because if we automatically assigned something that is totally
off, that's not good. If we miss something, they can edit. But if we assigned something that is
totally off and they missed the point or it's a lot more work to remove these assigned terms, they
agreed that they will go ahead and see how many of the things that we assign are really bad and how
many are well, okay the indexer would not assign it, but it's okay to keep it. So that's sort of
going forward.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

So, currently the workflow is for any new document that is to be indexed. The algorithm makes some
predictions for the primary and secondary or, and the subheadings. And they are edited either by
adding new headings or by removing the incorrect ones. And that happens for each document that goes
through?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Each article that should be indexed from MedLine. Yes. So our index section has indexed a million
papers this year.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Wow. How many indexers are there?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

I believe one hundred and twenty.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

That is a lot, I mean for this magnitude of data.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Yeah.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Yeah. Thank you for doing this service. This is amazing. So you mentioned the shared task for
question entailment and I know that you're involved in many other workshops and shared tasks. Would
you like to tell us some of the other ones that you're involved in, targeting NLP researchers who
are interested in working more in this domain, suggesting areas where they can focus on if this is
what you want to work on?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So the ongoing track is precision medicine, some kind of a clinical decision support track was
running for a very long time. I think we started about 2012 and it's been ongoing and we've seen
really good participation over the years. But I think this year we've seen that the interest is kind
of going down. So, we will see if we can come up with really interesting new ideas. So the idea is
to find really precise treatments for cancers. The researchers are given a description of the
patient and the cancer and the specific mutation and they have to find treatments that might work on
that patient. So that's the ongoing task for 2020.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

And how was the task set up? What does the output look like for a system like this.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So it's standard track, find relevant documents. And this year we also had the sub task of
extracting treatments from these relevant documents and only two teams actually attempted extracting
treatments from the documents. So I'm not sure if we will go ahead with that. The other tasks that
we had, and we're still, we're not sure that we will have it next year, is the drug-drug interaction
extraction. So I did not talk about our collaborations with FDA. FDA have these package inserts that
are very relevant to patients also because this is everything you should know about the drug that
you're taking and it is not machine understandable. So it is in a sort of XML like format and the
sections are clear, but within the sections it is all free text and very often it is not quite clear
if the adverse reaction was observed or if there was an interaction between these, the labeled drug
and some other drug.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So, we've annotated several hundreds of these drug labels for adverse drug reactions and for drug-
drug interactions and we've had several pack challenges on that topic. The collections are of course
all available. And what's really nice, I'm always getting these emails about how, you know, can I
use that collection? Yes, of course. Please do. So so, so big collections leave on after the
challenge so anyone can use all of these. And the same goes for consumer health question answering
and we released a lot of annotated questions. We used a question answer appears on summaries of the
questions. So all of these are available.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Oh, so that's very relevant to a project I've been working on recently with Lucy Wang another FDA
tool, where, we were extracting drug supplement interactions from scientific documents. And I'm
wondering, in your perspective, to what extent we want to extract these interactions, whether it's
drug-drug or supplement-drug interactions from the scientific literature as opposed to the labels
that are provided by FDA. I guess the supplements don't have FDA labels necessarily. Right?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

So, the supplement will be there only if it is mentioned in some drug labels. And there are very
few. And of course supplements are not regulated by FDA. Right? So you will find that in the
literature. Although we did not find all that many, and I think the social media will be another
really good source. It is not very clear usually, right? "Oh, I am taking this drug, and I took that
supplement and this is [what] I experienced. So you'll have to do a lot of inference I think to see,
you know, someone is complaining, I don't know about nausea, what else? And then they say, well I
always taking that vitamin and I recently started taking that drug. Or maybe it could be a series of
communications that will give you the whole picture of what is that. You know? Very often we had a
very interesting study several years ago, people coming into the hospital and the first thing the
nurses asked them was what drugs are you taking?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

Of course they say something. Of course no one ever mentions the supplements they're taking. So
unless the nurses specifically asks, are you taking a supplement? Then people would probably go
like, "Oh yeah," maybe. Oh. And then we also have the database from the vendors where they actually
record what's been given to the patients, what the patients bought from the pharmacy. And when our
researchers put these tools together, it turned out that there's only one third intersection between
the two. So a lot of these prescribers information was incomplete because the patients were getting
stuff from elsewhere and taking these other things and a lot of what they told they are taking, they
forgot about the other stuff.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

When I think about incorporating a model like this, right, so let's say we want to help medical
providers, I didn't flag basically potential interactions when a patient mentions the drugs they're
currently taking or maybe taking. I imagine the hardest thing about, harder than developing the
model that makes the predictions or like tries to find old candidates, is actually convincing the
medical providers to use it. And I wonder to what extent medical professionals are involved in
designing the tasks and to what extent the results of a model that performs well on these tasks
would be trustworthy.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

That's a really good question. There are several organizations where the informatics professionals,
the computer scientists and, and the practitioners come together. There is AMIA. So definitely there
are clinicians that are very involved and actually seeking what percentage are they out of people
who are actually prepped as day to day. I would think it's a smallish percentage but they do exist.
And I think like, you know, teaching hospitals will help probably a higher percentage of people that
are involved with research. The other thing that you mentioned in that would be very interesting for
NLP research, the big picture is these noise resistant models and the models that can explain why
they're recommending it and also recommend with very high confidence, because I'm sure you've heard
about the alert fatigue among clinicians that, you know, we always hear some horror stories where
there were so many alerts, they turn them off and then there was these fatal alert that they did not
see because they turned off the alerts. So we have to be very judicious in when to actually send an
alert.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Yeah, I do remember in various like hospital visits, hearing continuous alert systems like sounding
and it seems like nobody's paying attention because just like it's just too many of them.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

As with any signal, if it's constant, I think our brain just tunes it out.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Yeah. I really appreciate your perspective of this. I know you've been trained both as a medical, as
an MD and as a computer scientist so you have PhD in both areas. It's pretty impressive that you did
that. Congrats on that, and thank you for trying to bring the two fields together. That's really
valuable service.

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

I'm not alone. There are many people that are trained in both and of course there is this area of
Medical Informatics that tries to cover both and actually give formal education in both.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

If someone wants to do a program like this, what they should be looking for?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

If someone wants just an introductory level of what is it all about? There is the AMIA, American
Medical Informatics Association, 10 by 10 and there are courses offered by different universities.
There is OHSU, there's Stanford. They all have a slightly different flavors and people can look into
which flavors are most interesting for them. So I had one of my postdocs, actually, his background
is in computer science and he took that AMIA 10 by 10 and he was very happy because it opens that
perspective of what are the clinicians thinking about what are their needs? And then it's mostly
online, but I think they have have a final meeting and the Medical Informatics Association
conference.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Wonderful. All right. Is there anything else that you wanted to bring up in this episode before we
close?

</Turn>


<Turn speaker="Dina Demnar-Fushman" timestamp="">

I think I'm fine. Thank you, and for asking all these wonderful questions.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="">

Thank you so much for joining us, Dina.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="">

Thanks a lot. It was nice talking to you.

</Turn>
