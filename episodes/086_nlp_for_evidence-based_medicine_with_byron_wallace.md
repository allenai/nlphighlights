---
title: "NLP for Evidence-based Medicine, with Byron Wallace"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["New Speaker","Byron Wallace"]
number: "086"
tags: []
description: "In this episode, Byron Wallace tells us about interdisciplinary work between evidence based medicine and natural language processing. We discuss extracting PICO frames from articles describing clinical trials and data available for direct and weak supervision. We also discuss automating the assessment of risks of bias in, e.g., random sequence generation, allocation containment and outcome assessment, which have been used to help domain experts who need to review hundreds of articles. Byron Wallace's homepage: http://www.byronwallace.com/ EBM-NLP dataset: https://ebm-nlp.herokuapp.com/ MIMIC dataset: https://mimic.physionet.org/ Cochrane database of systematic reviews: https://www.cochranelibrary.com/cdsr/about-cdsr The bioNLP workshop at ACL'19 (submission due date was extended to May 10): https://aclweb.org/aclwiki/BioNLP_Workshop The workshop on health text mining and information analysis at EMNLP'19: https://louhi2019.fbk.eu/ Machine learning for healthcare conference: https://www.mlforhc.org/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F606448866&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

So today we'll be talking about NLP for evidence based medicine with our guests Byron Wallace. Byron
is an assistant professor at Northeastern University and holds an adjunct appointment at Brown
University in affiliation with the Center for Evidence Synthesis in Health Byron works on machine
learning, data mining and natural language processing with an emphasis on applications in health
informatics. Welcome to the program Byron.

</turn>


<turn speaker="Byron Wallace" timestamp="00:33">

Yeah, thanks very much for having me.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:34">

To get started. Could you tell us what is evidence based medicine? Why should we care about it?

</turn>


<turn speaker="Byron Wallace" timestamp="00:39">

Sure. Yeah. So it's kind of a funny term, right? Like the jokey definition that I sometimes like to
give is that evidence based medicine is kind of what you would have hoped all medicine is, but it
turns out this is not the case. Right? So for historical context, evidence based medicine or EBM
kind of came to the forefront as a paradigm. A sort of radical paradigm, I guess in the 80s it's
really a data-driven view of how we should practice medicine. It's very much an empiricist view. And
the fundamental idea is that we ought to inform the treatment of patients using the totality of the
available evidence, right? So basically you want to have some sort of systematic and ideally
statistical aggregation of the entire evidence that might bear upon a particular clinical question
that one might have. For example, you know, what treatments should I use for this particular
condition? And so you want to somehow synthesize all of the evidence that's out there and then you
want to use that to inform treatment decisions. And that's really just the basic idea behind EBM.

</turn>


<turn speaker="Matt Gardner" timestamp="01:41">

Can I ask a clarifying question here?

</turn>


<turn speaker="Byron Wallace" timestamp="01:43">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="01:43">

I imagine there has been medical literature for a whole lot longer since the 1980s and so surely
people have done scientific studies on medicine before this. So what's different?

</turn>


<turn speaker="Byron Wallace" timestamp="01:56">

Absolutely. I think it's really a point of emphasis. It's more of a sort of named paradigm, I guess.
You're exactly right that of course trials of course predate evidence based medicine. I think one of
the fundamental things about evidence based medicine is instead of being able to like cherry pick
individual trials that might support a particular treatment agenda that you have. I guess one of the
key differences is that an EBM one specifies upfront, a priori, a clinical question, and then one
systematically goes out and finds all of the trials that, for example, address that question. And I
think this notion of like aggregating the individual trial results in a robust and reproducible and
systematic way is really one of the hallmarks of EBM. But, of course, again, you're right, it's not
that EBM is the first time that data was used to support treatment decisions. It's just that it
doesn't happen as often as one might like.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:45">

So how can the NLP research help with evidence based medicine?

</turn>


<turn speaker="Byron Wallace" timestamp="02:49">

Yeah, I mean it's a great question. I think it's, it's such a ripe space for NLP folks. So if you
think about what happens, we sort of have this insane system, right? The way this works is we have
these agencies that fund, let's say, trials, right? So clinical trials and the way that we
subsequently disseminate the results of those trials kind of insanely is via unstructured or free
text articles. Right? So basically these are just publications that describe the conduct and results
of clinical trials. And consequently we have these other groups that are then funded to go out and
systematically synthesize the results from these different trials that have been published. And so
that of course requires them wading their way through the literature, unstructured texts and
identifying articles that meet their so-called inclusion criteria. So basically these are articles
that answer their clinical question in the sense that they are trials that enrolled the patient
population of interest.

</turn>


<turn speaker="Byron Wallace" timestamp="03:49">

For example, you know, diabetics or people with some particular condition and they included some
interventions of interest, like particular drugs or particular treatments. And they measured some
specific outcome. So doing this, first of all, identifying the set of articles that are out there
that describe trials that meet this inclusion criteria is a lot of work. So researchers at evidence
based practice centers or other groups that do these sorts of syntheses will end up retrieving from
Medline or, or Pubmed, you know, on the order of sometimes tens of thousands of articles that may or
may not meet their inclusion criteria. And what they'll do, and I know this because I spent some
time as like an embedded computer scientist, at Brown, which you mentioned in the center for
evidence synthesis. And I watched these doctors and other highly trained personnel like biostats
types, they were literally printing out thousands of abstracts and sort of assessing one by one
whether or not this met their inclusion criteria.

</turn>


<turn speaker="Byron Wallace" timestamp="04:46">

Right? So right away you can see vast opportunity for classification sort of methods to speed that
process up. And so that's one obvious area. There are problems from the methodological side or
difficulties, right? So this is an application in which there's severe class imbalance of those tens
of thousands of articles that you pull. You're probably only going to identify, you know, on the
order of tens that are actually relevant to your clinical question. And so that that needs to be
kept in mind from a sort of modeling perspective. So that poses some difficulties. So after this, of
course, once one has identified a set of let's say tens of articles or more that have been
identified, one has to extract the structured information that they need for their synthesis. And
the synthesis is going to both be statistical ideally. So you'll basically find, for example, the
odds ratios that were reported in each individual study.

</turn>


<turn speaker="Byron Wallace" timestamp="05:40">

And you'll also find other information about the trial, like how many participants were enrolled.
Also some things that are a little bit more subtle, like is this a quality study? And the way that
that might be determined is using what's called a risk of bias assessment. And so there's this
notion of risk of bias that's been formally codified in something called the Cochrane risk of bias
tool. And so, um, all of these things are things that we could view as NLP tasks. And I have and
others have as well, not just me. And so I think there's just a lot of room for models that can
identify relevant, articles and extract the relevant information from those articles. And I think
it's important to keep in mind that it's unlikely we'll replace the folks doing, the domain experts
that are doing evidence synthesis, but I think we can aid them. So I think that's another
interesting component of this work is that you really want to design models that are meant to help
humans performing this task to make their lives, I guess less miserable. And we don't really have in
mind completely automating evidence synthesis, at least not just yet.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:45">

So I'm curious how the inclusion criteria typically specified. It seems like it will not be easy to
express this in a way that our models can, can accurately represent.

</turn>


<turn speaker="Byron Wallace" timestamp="06:56">

Yeah, that's a really good question. At least traditionally an EBM, the way that clinical questions
are thought about are as what are called PICO frames. So this refers to the population, the
intervention, the comparitor and the outcome as a silly kind of toy example. The population might be
individuals who you know have migraines and the intervention might be aspirin, the comparitor might
be Tylenol or a placebo. And the outcome might be, I don't know, duration of headache right there in
practice. They'd be much more complex than this. But that would be like an example of a PICO frame.
And the question that's implicitly specified by this PICO frame is basically is aspirin more
effective than Tylenol at reducing the duration of headache in patients that suffer from these
migraines? Right. In that sense, it's actually a pretty well specified question. And then the task
is to try to infer, I guess, whether or not the evidence agrees with this or not.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:56">

Yeah, that makes sense. So I guess as you add more complexity, so I don't, different ages or
different ethnicities, to the population. I guess what I'm not sure about is what kind of
complexities should we expect in the inclusion criteria and what is a good framework to represent
this information? Or is there an existing one that people typically use?

</turn>


<turn speaker="Byron Wallace" timestamp="08:17">

I think a lot of times the key element of the PICO frame that implicitly specifies the question is
often really just going to be a condition and it's typically not going to be super fine grained. The
hope is that these trials are going to generalize to the population at large. So you might see
things I suppose like you know, infants with a particular condition or something like this. But I
think in general the population frame is really going to primarily be encoding the condition or the
disease in many cases that the question involves, right? In terms of encoding this of course free
text or unstructured texts is the obvious option. Not Ideal in many ways there are structured
vocabularies in this space. So there are things like the Mesh ontology that, you know, one can try
to map these things too as well.

</turn>


<turn speaker="Matt Gardner" timestamp="09:03">

So when I hear you describe this, what it makes me think of is going over, say as a paper comes in
to Pubmed or just taking the existing corpus, I would take each paper individually and extract from
it a PICO frame and then when someone has a question they want to answer, they want to create some
synthesis, they will write down a PICO frame and then I just had like a matching problem or a
retrieval problem and all of these papers. Is that the kind of approach or is there something
different going on here?

</turn>


<turn speaker="Byron Wallace" timestamp="09:30">

Yeah, so that's a great comment. I mean it would be nice if PICO search in that and it's like a
structured search over the PICO frames were available. A in general folks have looked at this, but
it is sort of relatively new that what you've described has been done and that's actually something
we're working on now as well. So the idea is, as you say, identify all of the articles that describe
let's say randomized controlled trials and then extract the PICO snippets I guess, and index those
separately so that you can then subsequently issue structured queries over those elements. This is
at present, not really doable. There are various search engines that will give you PICO frames, but
many of them are actually just doing unstructured search underneath that. One of the reasons that
this is the case is because there just hasn't been training data for it.

</turn>


<turn speaker="Byron Wallace" timestamp="10:17">

And this is I think one of the things that make this an interesting domain. You know, supervision is
hard to come by. So we've done some work on trying to fix that problem. So we've released this
corpus, EBM NLP that has a lot of these PICO elements tagged in abstracts with a mind towards doing
exactly what you were describing basically. And so, you know, we hope that is a boon to research in
this area and we hope that people make use of that data set and we're making use of it for this
reason. And we envision technologies like that. The only, other thing I would mention in that space
is with the mind toward retrieval. Another kind of approach that we've explored has to do with
inducing what we refer to as disentangled representations of abstracts or articles and the idea
there is to build a model using weak supervision.

</turn>


<turn speaker="Byron Wallace" timestamp="11:06">

We end up borrowing from kind of previously conducted systematic reviews for which we have access to
a sort of abstract of summaries of the respect of population intervention compared or an outcome
elements. These aren't verbatim quotes but we have kind of abstract of summaries that domain experts
generated and we've used this to train models that can give you back for a particular abstract, not
just one kind of monolithic vector representation or embedding, but in our case actually three
distinct embeddings, one that captures the population, one that captures the intervention and the
comparator. We collapse those together because the distinction is actually arbitrary ultimately and
one that captures the outcomes and the idea again is exactly to facilitate retrieval so that you
could search for things that are a match on this population using let's say co-sign similarity
between the population vectors, but maybe you don't care about the interventions of the outcomes, so
you're exactly right that this is the direction, but it's surprisingly not really available yet.

</turn>


<turn speaker="Matt Gardner" timestamp="12:03">

Yeah, that's really interesting. So you mentioned weak supervision there very briefly that it wasn't
very well explained, let me try to summarize what I think you meant and you can see if we're right?

</turn>


<turn speaker="Byron Wallace" timestamp="12:12">

Sure.

</turn>


<turn speaker="New Speaker" timestamp="12:13">

Basically you have a bunch of syntheses that have already been performed that have a described frame
and you have with that a set of papers that were actually included in this synthesis and so you can
essentially label all of the PICO frames in all of those papers with this synthesize one and use
that as training data.

</turn>


<turn speaker="Byron Wallace" timestamp="12:31">

That's exactly right. And the way that we actually do this is we derive what we referred to in the
paper describing this work as triplets and the triplets expressed that this paper describes a trial
that is more similar with respect to the population than this other paper basically. So there are,
there are the sets of three which specify like relatively similar but we use it in exactly the way
you described.

</turn>


<turn speaker="Matt Gardner" timestamp="12:53">

Yeah. That also helps to answer the other question I was going to ask which was do you have a case
where you might get multiple different frames from a single paper does this question make sense.

</turn>


<turn speaker="Byron Wallace" timestamp="13:03">

It does make sense. And that's actually one of the interesting aspects of this as well because for
example, many trials, in fact I, think the majority of trials will make comparisons between multiple
interventions and also make comparisons with respect to multiple outcomes, right? So for example, in
addition to duration of headache, I don't know, they might measure mortality or like pain of
headache or something like that, right? Like, and so because of this, that would correspond to a
different outcome. And many times the outcome that you cared about might not be the one that the
researchers that were doing the trial were really the most interested in. And so this is also like a
really interesting aspect of this space, I think.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:43">

So you mentioned an aspect of quality and bias when humans are assessing or when the experts are
trying to assess each of these articles. Could you give an example of maybe an extreme example of
articles that should be excluded?

</turn>


<turn speaker="Byron Wallace" timestamp="13:56">

Yeah, so I wouldn't go so far to say that they should or should not be excluded. The way that this
has done is researchers will try to appraise the risks of statistical bias that are present in a
reported clinical trial result. So as a practical example, the Cochrane risk of bias tool defines a
couple of different, what they call domains. One of these domains is the risk of bias due to
improper random sequence generation. Right? So when you randomize folks to either get, you know,
treatment A or treatment B, it's really important that you don't, for example, I don't know, like do
this based on their last name or other or like when they enrolled or like other things that could
introduce kind of weird biases. But you know, surprisingly sometimes this happens. So that's kind of
the simplest case and other cases, allocation concealment, basically the people that are doing the
randomization should be blinded to which group is going to get sort of which treatment.

</turn>


<turn speaker="Byron Wallace" timestamp="14:50">

Right? And similarly, when you do outcomes assessment, the folks doing that should not know which
group each person is in that they're assessing. So these are these different domains where if you
don't execute trial properly, you'll introduce biases into the result. Again, Cochran, which is an
international collaboration that performs these reviews in health and is widely respected and
they've performed many of these kinds of analyses of trials based on the articles describing them.
And what you're looking for are basically little phrases where the person that ran the trial, the
author of the study is saying, you know, here's exactly how we did random sequence generation.
Here's exactly how we assess the outcomes and here's how the person was blinded. It's kind of
analogous to how in our papers you really want somebody to tell you exactly how they set their hyper
parameters and if they don't like you're a little bit suspicious, right?

</turn>


<turn speaker="Byron Wallace" timestamp="15:41">

It's a similar story, right? So we've built models that can automate this process. So, and in fact
this is one of the things that we've had, I think the most success at practically speaking because
we have access to a relatively large set of supervision, it's a little bit noisy, but we have
supervision that we can derive from the Cochrane database with respect to risk of bias. And we've
used that to train models that can automatically do risk of bias assessment. Again, we have in mind
semi-automation. So basically we actually recently ran a randomized trial of our own where we had
our prototype tool, which integrates the natural language processing that does the automated risk of
bias assessment. And we randomized folks doing evidence synthesis to either be shown those
predictions and get a prepopulated risk of bias table or not basically. And the question is does
that, does it speed up the review process and do they like using it?

</turn>


<turn speaker="Byron Wallace" timestamp="16:36">

Right. And the answer seems to be yes. So that work is actually currently under review. But the
upshot was the predictions seemed to help them and they seem to enjoy using the tool. And I actually
think that analysis is really important. It's hard to do and it's kind of a pain. But it's hard
because you know, we have a bunch of previous work on this where, you know, we report F scores and
what not. As the years have gone by, we've introduced various versions of the model neuralizing
everything and adding some other cool stuff. But I think in order to know if it's really helpful,
you really have to see if the humans use it. I guess,

</turn>


<turn speaker="Waleed Ammar" timestamp="17:10">

Yeah, that's really exciting to hear that you're doing the sort of random file. So we didn't say
anything about like the quality. So how do you actually assess the quality?

</turn>


<turn speaker="Byron Wallace" timestamp="17:19">

I see. So, when you say quality, what do you have in mind? Like the quality of what?

</turn>


<turn speaker="Waleed Ammar" timestamp="17:24">

Well, I guess the first thing that comes to mind is recall. So when the top set who are shown the
predictions, what percentage of the articles that the other group cover by this one?

</turn>


<turn speaker="Byron Wallace" timestamp="17:34">

I see. Yeah. So, you mean in terms of the, quality of the model, the metrics, basically there are
two aspects to this, right? So in risk of bias assessment, you are ultimately making a
classification for each domain. For example, you're saying with respect to random sequence
generation is article at high or low risk of bias, right? And you're saying the same, it's multitask
in the sense that you're also saying that for allocation concealment and some other domains
simultaneously, and perhaps more importantly, the model needs to provide a rationale supporting
that, that judgment, that assessment. And so, our model is, for example, when we show them these are
full text articles and when we pre-populate the table we say, look, the model says we think this is
at low risk of bias with respect to allocation concealment. And here's why. And we point to a phrase
in the paper, because of this, we have sort of two sets of metrics.

</turn>


<turn speaker="Byron Wallace" timestamp="18:26">

One that quantifies our performance with respect to retrieving the snippets and one that sort of
quantifies how well we do at the overall classification task. Right? And so what we find is that
we're able to retrieve relevant snippets with high precision. This depends on how you do the
assessment. Off the top of my head, we're not quite competitive with obviously human baselines, but
we're getting there. And with respect to the overall judgment for some domains we do quite well. For
random sequence generation, for example, we can do, I think roughly as well as as humans as we've
evaluated using the Cochrane database as a proxy because we have multiple labels for humans. And you
know, it's a slightly subjective task. I should mention. So the humans themselves are not perfect.
We're still in the overall assessment than the humans.

</turn>


<turn speaker="Byron Wallace" timestamp="19:13">

So I guess what I'm saying is like the retrospective metrics are quite good. I apologize. Off the
top of my head, I don't, um, I don't have any numbers on hand, but we've reported these in various
situations using retrospective data. But for this particular trial that I'm describing, because we
already had those numbers and it looked pretty good, we were really interested in the usability of
it and that kind of thing. I suppose I should also say external groups to us have done assessments.
There was a paper that came out in the Journal of Clinical Epidemiology by a different group that
actually assessed Robot Reviewer, sorry, we call this prototype Robot Reviewer and they did a
assessment of its risk of bias assessment. And the, I often show this in talks because I sort of, I
get a kick out of it, but they end up concluding that robot reviewer actually performed better than
humans on two of the domain, Which I like. I'm not sure that I follow this. Like I enjoy that as a
notion. I don't know. Um, I don't know that I would fully endorse that position, but,

</turn>


<turn speaker="Waleed Ammar" timestamp="20:16">

Well that's great to hear that. See at least we're getting close. It's useful enough that you were
able to find collaborators who are willing to use it right. That's,

</turn>


<turn speaker="Byron Wallace" timestamp="20:25">

That's one thing that's like really amazing about this space is the kinds of people that do evidence
synthesis for a living. They really want this technology. Like they really hate doing the grunt work
that goes into a lot of what they have to do. And so the enthusiasm for this is just really exciting
and it's one of the reasons that I really like the space.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:46">

Great. So another question that I had in mind is how do you aggregate this information? So let's say
you extracted the numeric values that correspond to each of the outcomes that you care about from a
set of articles. Do you aggregate them by giving different articles, different weights, depending on
the number of subjects? How do you do this?

</turn>


<turn speaker="Byron Wallace" timestamp="21:02">

So this is actually a whole sub specialty that in statistics and biostats I guess called meta
analysis. So basically there's a whole kind of research community that's really focused on these
meta analytic methods. The idea is ultimately you're taking some sort of a weighted average and
often those weights are going to be inversely proportional to, the standard errors, right? So you,
you want to, you want to give more weight to studies that have high precision. And of course this
correlates quite strongly with sample size. So yeah, so you're exactly right now we're nowhere near
the point where we can reliably extract the actual data elements that are necessary for meta
analysis. So fully automated, that analysis is quite a ways away. I'm afraid. Um, but you know,
we'll get there.

</turn>


<turn speaker="Waleed Ammar" timestamp="21:48">

So the previous step that I kind of like assumed that we could get it as extracting the values, the
numeric values for the outcomes, whether it's the primary or secondary outcomes of the study, how
well are we doing there? Are there existing data sets.

</turn>


<turn speaker="Byron Wallace" timestamp="22:02">

There's practically no data on that. In terms of actually extracting the numbers for particular
comparisons, very hard. And as far as I know, there's no annotated data sets for this and there's
been a little bit of work. A couple of years ago there was a system called exact that would extract
some numbers, but trying to actually tie reported numerical results, which may be on different
scales and so forth to the ICO frames I guess is really hard. So I will say we have a new corpus
that we're releasing with an upcoming NAACL paper. So this is an NAACL 2019 paper. And what this
corpus comprises are full text articles from the open access subset articles from Pubmed. This means
they're publicly available and these described randomized control trials. And what we have in that
data set is; we've hired doctors via upwork to basically generate ICO frames, so interventions,
competitors and outcomes that are described in a particular trial.

</turn>


<turn speaker="Byron Wallace" timestamp="23:04">

And then we have them also, well we have a whole kind of annotation pipeline, but basically we ended
up collecting labels for those which says for this ICO frame, this article provides evidence that
supports the use of the intervention as opposed to the comparitor with respect to this outcome. And
we've collected multiple of these for each article. Right. And so this is sort of interesting
because you know, for any given article, again you'll have multiple ICO frames and the answer will
be different. But there we simplified the task, we treat it as a three-way classification task of
significantly decrease, neutral or significantly increase. And we kind of punt on trying to extract
the actual numerical information, as a, I guess, a compromise to try to make progress.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:48">

That's interesting. So are there other tasks that are related to evidence based medicine? Away from
the meta review or meta analysis type of work that also NLP could help with? Some of the things that
come to mind are, electronic health records that show up in hospitals.

</turn>


<turn speaker="Byron Wallace" timestamp="24:05">

Yeah. So it's a really good question and it's something that I think about a lot because I mean this
is a space that I've worked in for a while, aside from evidence based medicine stuff like I also
worked on, you know, EMR and that kind of thing. And I think NLP has a lot of potential there as
well of course. But it's interesting because you don't see a lot of crosstalk between, folks that
are working on, let's say EMR and, those that are working on trials literature. In the future I
think we'll see more of this, right? Because it makes total sense that what you really want to be
able to do is you want to take into account the evidence that exists in clinical trials that have
been done and you want to somehow combine that with information about individual patients that's
extracted from, for example, the EMR. How exactly you do that. Of course, you know, we don't know
yet, but we know that it's something that we should do. And so certainly there's been a lot of work
on trying to extract information from EMR. I think we'll see more of it.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:57">

Yeah. I'm also reminded of some, by Arman Cohan where he analyzed Reddit comments that people have
in social media trying to assess, to try to extract like for example, comments that may indicate,
people are diagnosed with a certain disease, which it seems like it's a very open ended base.
There's a lot of potential for contributions. There's not enough work on this area.

</turn>


<turn speaker="Byron Wallace" timestamp="25:22">

You know, the space in general, I think what precludes a lot of NLPers from working in it is, you
know, there's not a lot of data sets that you can just kind of pick up and, and work with. And on
the EMR side MIMIC has been, so there's a, there's a dataset called MIMIC, which is an anonymized
set of EMRs from an ICU. This is actually, you can get your hands on. It's publicly available now
and that's actually been a huge boon for the community. But I think just in general, there just
isn't a lot of data sets that one can go and pick up and start, start making progress on. Hopefully
that will change and that's one of the reasons that in recent work we've really focused a little,
quite a bit on corpus creation because I've seen that as a need. There are a lot of opportunities in
this sort of broad space of I guess NLP plus health. I hope that more people get involved.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:08">

I guess I'm a little bit surprised to hear that there's a corpus of electronic medical records even
anonymize that's available. Like it seems like that would be too fraught with privacy issues.

</turn>


<turn speaker="Byron Wallace" timestamp="26:18">

Yeah, I don't know. So I mean I think they've, they really took care and they're there. You do have
to jump through like a few hoops still. You have to get your hands on MIMIC, you have to kind of
register, you have to go through human subjects training through your institution. But once you do
that, if you're a graduate student, you'll tell them who your adviser is or who you're working with
and they'll sort of confirm that that person is indeed who you're working with and then you can, you
can use it. And you know, it's been a really impactful thing to have a common data set to try out
these different models. And there's loads of sort of weird and unstructured text that are in these
notes that is, you know, could be harnessed. But it's a challenging space.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:56">

I also heard from a friend who works on this area is, it's not that hard to get your hands on data,
but publishing this data. So because like the researchers in the medical institutes are very keen on
making advances in this area, but they're not, of course, they're not allowed to, to publish the
data.

</turn>


<turn speaker="Byron Wallace" timestamp="27:15">

I see, yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:15">

You do get permission of using this data for research purposes, but they're not allowed to be
published.

</turn>


<turn speaker="Byron Wallace" timestamp="27:20">

Oh, you're absolutely right. So I think those of us that like, you know, for example, I work a lot
with sort of partners healthcare here and in various hospitals in Boston and so we can run
experiments on their data, but subsequently we, you know, it's not really open in the sense that we
obviously can't go and make those publicly available and I think MIMIC has been really valuable in
providing that, that common touch point. So I just, that's a really practical example that we're
currently working on. We're kind of doing this analysis of different encoders for different encoder
models that would be a best for the clinical notes in the EMR. And we can do, we're doing this with
some data set with a data set that we have from partners, health care that we can't distribute. But
then we're subsequently, we're also doing it with the MIMIC data set and seeing if the trends, first
of all, if they hold, but then also that's reproducible. And so there's sort of like a medium there
that we can, that we can reach, which is nice.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:17">

I remember Alex Smola had a blog a few years ago talking about the difficulty of releasing some kind
of data should not prevent us from doing research on this, on this data. And of course there's like,
ideally we'd like everything to be open and reproducible, but if that's not the case, we shouldn't
stop working on it.

</turn>


<turn speaker="Byron Wallace" timestamp="28:36">

Yeah, I mean I think it's complicated, right? But yeah, I mean I obviously there are real privacy
concerns, but on the other hand, you do want open science. So I think striking that balance is, you
know, something that we'll continue to negotiate and hopefully muddle our way through.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:50">

Right. So I'd like to give a shout out to with the EMNLP workshop, it's happening with ACL this year
the due date for submissions is April 26 it's been really a helpful catalyst in the NLP community to
bring more people into this area.

</turn>


<turn speaker="Byron Wallace" timestamp="29:04">

Absolutely. It's a really a great group and the organizers are wonderful. So that's, that's
definitely true. There's also at EMNLP or historically I think it's been an EMNLP. There's the
international workshop on health text mining and information analysis. So that's another place to
look and hopefully we see more of these as we grow. I'd also give a shout out, I co organized
something called machine learning and healthcare and we'd love to see more, at least I'd love to see
more NLP submissions coming in. And so this, we hold every year, this year it's going to be
University of Michigan at Ann Arbor. So that would be another place that might be a good fit for
some of this work.

</turn>


<turn speaker="Waleed Ammar" timestamp="29:39">

Was it a workshop independent of other conferences?

</turn>


<turn speaker="Byron Wallace" timestamp="29:42">

It's its own conference. So the, the main aim of machine learning for healthcare was to make sure
that we had physician representation. So a bunch of us that felt like we kept ending up in roomfuls
of computer scientist. And I mean I liked computer scientists, but I think when you're doing this
kind of interdisciplinary work, it's really important to really have real conversations with the
people that are the domain experts. And so that's kind of where MLHC came from. And that wasn't
really, I think we sort of all agreed that the last thing the world needs is another conference. But
on the other hand, we really felt like there was a need and it's been a lot of fun. So we held it.
We actually, we held it here at Northeastern two years ago and then last year we had it at Stanford
and it's been growing and it's good people, but yeah, we're still kind of getting, getting it off
the ground.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:28">

Well, that's fantastic. Thank you for doing the community work there. I know it's not easy to plan
for a conference.

</turn>


<turn speaker="Byron Wallace" timestamp="30:34">

Sure, sure.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:36">

Did you have any other thoughts that you'd like to talk about on this topic before we conclude?

</turn>


<turn speaker="Byron Wallace" timestamp="30:40">

Well, I guess the only other thing I would say is, aside from sort of its practical importance, I
think this general space from just from a strictly sort of NLP perspective is really interesting
because it sort of highlights a lot of, I guess, shortcomings or issues with state of the art
approaches. A few concrete examples, right? So this is a domain in which supervision; we've touched
upon these issues, right? But supervision is very expensive. We don't have much of it. It's also not
an area where you can just kind of throw up tasks on Turk. I mean you can try and in fact we, we've
tried in various ways and, and you can get stuff but you, it takes effort, right? Like it's
generally speaking because of the domain expertise requirement, it's nontrivial to get supervision.
So That's interesting. And then there's of course the inherent issue of needing some sort of
transparency or interpretability of models now exactly how to define that and so forth is a hot
topic. But it's obviously important in this sort of broad domain of health, right? I think for
obvious reasons, I think it's an exciting area, not only for its practical applications, but also
for the core technical challenges that, that it motivates. So I'd encourage more NLPers to come work
on these problems.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:49">

Totally. It's a reality check. How far did we actually go in NLP.

</turn>


<turn speaker="Byron Wallace" timestamp="31:54">

I think so. I think that's fair. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:56">

All right. Thank you very much for joining us today. That was fun.

</turn>


<turn speaker="Byron Wallace" timestamp="31:59">

Yeah. Thanks so much for having me. I had a lot of fun chatting.

</turn>
