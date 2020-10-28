---
title: "FEVER: a large-scale dataset for Fact Extraction and VERification, with James Thorne"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["James Thorne"]
number: "060"
tags: []
description: "NAACL 2018 paper by James Thorne, Andreas Vlachos, Christos Christodoulopoulos, and Arpit Mittal James tells us about his paper, where they created a dataset for fact checking. We talk about how this dataset relates to other datasets, why a new one was needed, how it was built, and how well the initial baseline does on this task. There are some interesting side notes on bias in dataset construction, and on how \"fact checking\" relates to \"fake news\" (\"fake news\" could mean that an article is actively trying to deceive or mislead you; \"fact checking\" here is just determining if a single claim is true or false given a corpus of assumed-correct reference material). The baseline system does quite poorly, and the lowest-hanging fruit seems to be in improving the retrieval component that finds relevant supporting evidence for claims. There's a workshop and shared task coming up on this dataset: http://fever.ai/. The shared task test period starts on July 24th - get your systems ready!

https://www.semanticscholar.org/paper/FEVER%3A-a-Large-scale-Dataset-for-Fact-Extraction-Thorne-Vlachos/7b1f840ecfafb94d2d9e6e926696dba7fad0bb88"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F464737575&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:05">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allan Institute for
artificial intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right, so today our guest is James Thorne who is a PhD student at the university of Sheffield
working with Andreas Vlachos. He is interested in fact checking, dabbled a little bit in semantic
parsing, but is more interested these days in and how we know what things are correct and welcome to
the podcast. James.

</turn>


<turn speaker="James Thorne" timestamp="00:28">

Thank you. It's great to be here. Honored to be among so many good guests on the season.

</turn>


<turn speaker="Matt Gardner" timestamp="00:33">

So the paper we'll be talking about is called FEVER: a large-scale dataset for Fact Extraction and
VERification. So James, can you tell us about what the motivation is for building this dataset?

</turn>


<turn speaker="James Thorne" timestamp="00:44">

Yeah, sure. So a large number of systems that we use today, information that is extracted from the
web. So you can imagine semantic search or question answering on a new additional parsing system.
Yeah, this may be limited by the breadth, the breadth of information we can answer, maybe limited by
the sources we get information from being able to use a greater diversity of sources should allow us
to answer greater depth of questions. The breadth of questions, sorry. Even though sites like
Wikipedia have moderation policies, it's possible that user generated content may be published that
isn't accurate or consistent with our view of the world. So rather than focusing on what we extract,
we focus on verifying the sources. We're starting from a to allow these systems to kind of be able
to talk to a broader range of questions.

</turn>


<turn speaker="Matt Gardner" timestamp="01:27">

I see. So this sounds similar to something like fake news detection. I know this has been in the
news a lot recently. People have been thinking about this. I've talked to people that are working in
this kind of thing. How, how does what you're working on fit into this whole fake news thing?

</turn>


<turn speaker="James Thorne" timestamp="01:43">

Okay, So our motivation isn't just fake news and we should be a bit careful with talking about the
term fake news by itself. Our motivation in this work is to identify misinformation and that's where
inaccurate facts may be published. Information can be used to mislead the reader or the public. But
in this work we kind of focus on the encyclopedic domain for work and trying to avoid news as well.
Dealing with journalism requires a large volume of world knowledge, which kind of isn't captured to
the same degree in a machine readable format that we have in Wikipedia.

</turn>


<turn speaker="Matt Gardner" timestamp="02:15">

I see. So you're less interested in people that are actually trying to deceive you then did someone
make a mistake? Is that, is that fair?

</turn>


<turn speaker="James Thorne" timestamp="02:23">

That's correct.

</turn>


<turn speaker="Matt Gardner" timestamp="02:24">

So how then I guess I feel like I've seen a bunch of data sets related to this. Why do we need a new
one? What's different about yours?

</turn>


<turn speaker="James Thorne" timestamp="02:32">

Yeah, it's great that this area's become an exciting taste or an exciting topic to research. So I
think when we consider available resources, there's like three axes. We need to look at kind of the
inputs and that's whether we're dealing with textual claims. Triples are entitled documents, the
evidence that's used or not as that might be machine readable text, it might be tables or knowledge
graph and how well we trust that evidence. And then the decision made like is it a binary decision
or are we turning like a justification or like a point score. So we've seen many new datasets rising
in this field. Say last year we saw the fake news challenge from Dean Pomerleau and Delip Rao, which
modeled fact checking as part of an extensive classification. It's kind of similar to textual
entailment. And then last year at ACL we saw William Yang Wang publish his fake news dataset as
well. Our data set kind of is challenging with respect to some of these axes, predominantly with the
fact that you have to find the right evidence in order to verify whether something's true or false.
In the fake news challenge, the data is provided kind of in pairs and the systems just have to do a
classification. But I think being able to reason about what information is needed to verify a source
is very challenging and still an open research problem.

</turn>


<turn speaker="Matt Gardner" timestamp="03:47">

Yeah. Interesting. I thought about this a bit a while ago. Turns out one of the first episodes we
did on this podcast was a paper that was trying to find news articles citations for statements in
Wikipedia. So this sounds like a similar kind of idea, right? I have some collection of news
articles or in your case, encyclopedia documents and I have some claim that I want to find a source
for. And in that case you're just like, what news article should I cite, which implicitly says that
news article should like entail the claim, right? This is kind of the same problem. Do you, would
you, would you distinguish this like how is this different or the same?

</turn>


<turn speaker="James Thorne" timestamp="04:28">

It's a really interesting paper, and I wish I'd known more about it earlier, but I think in that
paper they highlight two challenges. The first is being able to identify sentences which require
citations and this is a problem in our domain as well, right, claim worthiness of detection. And
then the other challenge is finding the right citation. And this is similar to the challenges
presented in FEVER. So I think this work kind of identifies articles that can be used as citations
for claims and in that paper is three challenges. First identify sentences that required citations
and then follow sentences finding the right citation. And finding the right citation is a very
similar challenge to FEVER, but in their work they only really focus cite this on the positive
examples where you can find supporting articles. In FEVER we've got both correct information and
incorrect information on new challenges to be able to find evidence to refute the claim or to state
where we don't have enough information to make a fully informed decision.

</turn>


<turn speaker="Matt Gardner" timestamp="05:24">

Yeah, that's really interesting. I definitely think your data set is, is new and different and and
interesting on its own. I just think it's interesting to think about like how else could you get
supervision for this kind of thing. Could you make your data collection a little easier by
leveraging these existing sources? If you have a model that works well on this data, on your data,
could you also use it for something like citation finding? It's interesting to think about these
things. I have wondered as an interesting task. Maybe I could take it all of the news articles, not
Wikipedia articles to find citations. Like in a news article. If there's been a series of coverage
on a particular topic, could you automatically link to previous articles either to help journalists
sort of help readers if the citations are missing. Like there are a lot of interesting things you
can do, not just with this like fact verification but are similar along the same lines. It's really
interesting

</turn>


<turn speaker="James Thorne" timestamp="06:13">

That's a great followup, I think one of the interesting challenges with FEVER is rather than finding
just relevant sentences as you do with the information retrieval task, we want to find a diverse set
of evidence which kind of as a provides more thorough background and just things by themselves.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:32">

So it might be easier for the listeners to like keep up with this conversation if they actually know
what, how the dataset was constructed, can you give us a brief overview of how you constructed these
datasets?

</turn>


<turn speaker="James Thorne" timestamp="06:44">

I'll first describe what the data set looks like and then I'll go on to say how we constructed it.
So the dataset is 185,000 claims. These are human annotated factoid sentences, which may be true or
false. And then for each claim, we've annotated at a sentence level from other Wikipedia pages,
sentences which can be used as evidence to support or refute these claims. And then we have a third
option, which is not enough information where we can't find any sentences to fully support or fully
refute these claims. So in our case, a claim is a factoid sentence, and this would have been
extracted from a sentence from Wikipedia. Annotators were given a sentence at random from 50,000
most popular pages last year in August. And annotators were asked to extract simple facts, one per
sentence.

</turn>


<turn speaker="James Thorne" timestamp="07:34">

So you can imagine a sentence containing or saying Keanu Reeves is an American actor, director. He
stared in The Matrix and was born in October. There are multiple facts. So the annotator would
extract one per sentence to this easy or simple for score it. Then we have a second stage annotation
where we take these true facts into facts, which we don't know true or false. So those six mutation
types, the annotator was asked to do. This is everything from negation, generalization, making the
facts more specific, paraphrasing, substituting entities, et cetera. And so now we've got a set of
facts or claims which we don't know, true or false. And that's where the second annotation phase
happens, where a different annotator without knowledge of where the original sentence was generated
from the original factors generated from is asked to find the evidence by labeling sentences which
supports or refute that claim.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:30">

So the first one includes both identifying effect and also creating an alternative, like another
fact can be derived from it right from it or that contradicts, is that right?

</turn>


<turn speaker="James Thorne" timestamp="08:42">

Yes. so the first is to extract the original claim, the extract the claims from the original
sentence. And the second stage is to mutate it to the point where we don't know if it's true or
false.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:53">

So the final product is a set of instances and each innocence contains one claim and one evidence
either in favor or against.

</turn>


<turn speaker="James Thorne" timestamp="09:02">

There are cases where the fact or a claim may not be able to be fully supported or refuted by just
one sentence. So 20% of our data approximately contains multiple sentences as evidence. And this
would be why these sentences have to be combined together in order to fully support or fully refutes
a claim. An example of this might be, Phill Collin's is a Gemini. So to answer to fully support or
refute this, we need to first look at Phil Collins, his birthday, which we see maybe in May, and
then we also need to go to Gemini and look at what date range a Gemini would be.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:38">

So in order to construct this example the first phase of the notations the annotator needed to
identify these two facts and combine them when they, they're writing the case that right?

</turn>


<turn speaker="James Thorne" timestamp="09:50">

Oh, of course. Well it's just to the evidence finding. So with the claim, the annotator wouldn't
know whether this true or false.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:55">

I see. So in the claim generation, the only used one of the facts and the may not be any of the
facts that are actually end up end up in the dataset. Is that right?

</turn>


<turn speaker="James Thorne" timestamp="10:06">

So I clarify this again. I think you might've misinterpreted what I'd said. There's two stages of
claim generation and then one third of the stage claim verification. So in the claim generation step
and the annotator first extracts claims that are true from Wikipedia. The second stage of this is to
mutate the claims. So we don't know if it's true or false. And the annotator is doing this by
following like six types of mutations such as negation, or paraphrasing, entity substitution,
cetera. At that point we put a pool of claims which we don't know true or false and these form the
claims in our dataset. The next part is where the annotators are different set of annotators are
labeling the claims by selecting evidence from other pages without knowledge of where the claims
generated from.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:57">

Yes, yes. Makes sense. Thank you.

</turn>


<turn speaker="James Thorne" timestamp="11:00">

What corpus are you looking at when you're generating evidence, but what can the annotators actually
use as evidence to decide if the claim is true or false?

</turn>


<turn speaker="James Thorne" timestamp="11:09">

Yeah. So all the facts in this dataset can be answered using Wikipedia. I think it'd be important to
consider different sources in a promote setting, but we want our experiments to be closed world in a
way which is repeatable and this experimental setting. So our modeling decision was to treat the
Wikipedia corpus as correct with respect to evidence. And the challenge we present is to find the
evidence in supporting or refuting sentences to backup a claim which was generated from Wikipedia.

</turn>


<turn speaker="Matt Gardner" timestamp="11:41">

Yeah. So I guess you're assuming that you have some corpus that you assume that everything in that
corpus is correct for better or for worse, right?

</turn>


<turn speaker="James Thorne" timestamp="11:49">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="11:50">

In my PhD we worked on the never ending learning project where we were trying to extract information
from the web. And we thought a lot about, well, what if there's wrong information on the web? And
there's plenty of it. And so you have to think about, well, what sources should I trust? We didn't
actually address that problem in NEL, but we thought about it a lot. Here you're saying this is,
we're just setting that problem aside cause it's hard, right?

</turn>


<turn speaker="James Thorne" timestamp="12:15">

I think verifying the source of the information is important, but it's a orthogonal research
problem.

</turn>


<turn speaker="Matt Gardner" timestamp="12:20">

Right.

</turn>


<turn speaker="James Thorne" timestamp="12:20">

And there's many ways if you go about verifying a source, so you can verify the content in the
source. You could verify the originator of the source or you could verify the style in which the
source was written in. And these are covered in a number of related work such as speaker profiling,
clickbait detection, trust rank and subjective language detection. And so our modeling decision
treated Wikipedia is correct in assumption. And then we would assume that this verification of
source can be done in a followup or different work.

</turn>


<turn speaker="Matt Gardner" timestamp="12:56">

Alright, cool.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:58">

I wanted to ask about the second secondary claim labeling part it seems like a difficult task. Was
this crowd sourcing?

</turn>


<turn speaker="James Thorne" timestamp="13:05">

So the annotators we had for our task were actually temporary staff of our research lab. So this
meant we could train them professionally and we could maintain like a continuous dialogue with our
annotators, making sure the things we found difficult to annotate could be incorporated into our
subsequent guidelines and allow us to continually improve our annotation procedure. And furthermore,
the style, the way we generated these claims. Yeah. The, the way we generated these claims, the way
our annotation interface allowed the annotators to generate the claims would have a great impact on
the types of claims generated as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:45">

Oh, you mean it's easier to verify or harder to verify

</turn>


<turn speaker="James Thorne" timestamp="13:49">

In order to do these mutations the annotators have to be creative with the types of new information
they introduce. And so by providing, in our pilot studies, we found by providing, making something
more general and making something more specific together in the annotation interface, allow the
annotators to generate high quality claims. And if we just asked for one type of mutation to be done
so in our annotation, we accounted about one minutes for median average time for the annotators to
verify a claim. And we found given this time constraint, these annotators were only able to find
about 70 to 75% of the right evidence to the claim and then we compared this against a pool of super
annotators who operated without time constraints. And yeah, it was important for us to continually
measure this when we were generating a task and also provides an insight into what the kind of
expected human level performance would be in a time constraint setting.

</turn>


<turn speaker="Matt Gardner" timestamp="14:57">

I guess you don't really have to annotate all of that, the annotation that you really need is just
does this claim, does this evidence support this claim? Or refute this claim, but if you want to
actually measure recall over a specific corpus, then yeah, you have to be exhausted. I just thinking
of like relation extraction or slot filling kind of work, it's not that typical that you really
measure this recall in this particular way. So it's nice that that your dataset has some nice
measures of this.

</turn>


<turn speaker="James Thorne" timestamp="15:27">

Yes, there are also to follow up, this would be like finding multiple needles in a haystack. And I
think often the simplest explanation as a way to often the most right. And so we had to incorporate
that into our guidelines where given the time constraints annotators were asked to select the
earliest occurrence of evidence on a page or the simplest explanation rather than these really
convoluted explanations which may be difficult for a human to understand.

</turn>


<turn speaker="Matt Gardner" timestamp="15:53">

Interesting. So another related piece of work, there's been a few papers recently from a couple of
different groups that look at what they're calling annotation artifacts and when you are generating
texts. So they looked at a, this corpus called the rock stories corpus or dataset called the rock
stories close dataset where you have four sentences written by the, that are a simple story written
by someone on Mechanical Turk and then a fixed sentence that is either a correct continuation or a
nonsensical continuation of the earlier story. And similarly and they found that just by looking at
the last sentence, you can decide whether it's a nonsensical continuation or not, even though you
shouldn't really be able to do that. Same with the Stanford natural language inference data set
where you can get some decent performance, not, amazing performance, but you can get much better
than a random just by looking at the hypothesis where in this dataset given one sentence you're
supposed to conclude if it entails the other or not. And if you just look at the sentence that
you're supposed to decide if it's being entailed, you can decide with some accuracy whether it's
entailed or not. This work came out around the time you were building this dataset. So you probably,
this probably wasn't much on your mind when you were doing this, but any thoughts on how this
might've affected your dataset set? Have you tried to measure this since this other stuff came out?

</turn>


<turn speaker="James Thorne" timestamp="17:15">

Yes. It's a really interesting, really interesting topic looking at bias in our datasets. And we
have done some studies in subsequent experiments and we find comparable to the multi NLI dataset, we
can find the 50 to 55% of our claims can be answered on the hypothesis only level if we're just
looking at supportive, refuted or not enough information or applying that label to the claims.

</turn>


<turn speaker="Matt Gardner" timestamp="17:39">

Yeah, that's interesting. So, and in this case, by the setup random, the labels are evenly split
between the supported refuted and not enough evidence and not enough info. So you have 33% chance
will be random, so you can get, you said 50 yes or so. So yeah, significantly above chance, but at
least it's not way higher than that. So that's good.

</turn>


<turn speaker="James Thorne" timestamp="18:01">

Yes. And it also shows that the artifacts problem is equally as problematic to us as the SNLI style
of our datasets if we ignore the requirement for evidence. But that's not the whole story with our
dataset. One of the largest challenges in our data centers to find the right evidence, which is
needed to support or refute that claim. And that's incorporated into our scoring scheme. I believe
there may be other biases and that which we haven't fully observed, which aren't same as as SNLI
that may be fleshed out in subsequent experiments or as part of the shared task.

</turn>


<turn speaker="Matt Gardner" timestamp="18:35">

Oh, sorry. Let me back up for just a minute. You said so from the paper you ran an experiment where
you run your full model, which can access evidence. So you're given the claim it can go look at the
corpus to try to find evidence and then given whatever evidence it fines, it tries to predict
whether the claim is supported, refuted or not enough info. And in that setting where you're not
evaluating what the evidence is is good or not, you get 50% accuracy. Is that right?

</turn>


<turn speaker="James Thorne" timestamp="19:04">

Sorry, this might require a bit more explanation as well. And so in our data set, we report two
types of scores. There's the label only accuracy and there's the conditional accuracy on finding the
right evidence. So looking at the label only accuracy, this hypothesis only style evaluation, gives
us a score of about 50%, which is comparable to the multi NLI datasets.

</turn>


<turn speaker="Matt Gardner" timestamp="19:34">

I'm realizing now that we haven't even described what the baseline system does. So maybe that'd be
good to talk to talk about first and then we can come back to this question.

</turn>


<turn speaker="James Thorne" timestamp="19:42">

Sure.

</turn>


<turn speaker="Matt Gardner" timestamp="19:42">

So you want to describe what the, what is your baseline system on this data set? How does it work?
What does it do?

</turn>


<turn speaker="James Thorne" timestamp="19:48">

Okay. So our baseline system is a pipeline of two components. We first retrieved the right evidence
and then we do a classification as to whether the evidence supports or refutes the claim. Once we've
done that, so the evidence retrieval component is a TF-IDF based information retrieval system. We
first retrieve the right document and then from those documents we select sentences which are
relevant and we pass those sentences into the classifier, which is a decomposable attention
classifier. And then to score that baseline, we have two scoring metrics as the first scoring metric
is a label accuracy, which only looks at whether we're getting the right claims supported, refuted
or not enough information. And then the second metric is a conditional label accuracy on the right
label given the evidence we found.

</turn>


<turn speaker="James Thorne" timestamp="20:42">

So we in our data set, we've labeled the correct evidence and we'd only give the scote if we find
the correct evidence and apply the correct label.

</turn>


<turn speaker="Matt Gardner" timestamp="20:52">

How does that work when there's not enough evidence?

</turn>


<turn speaker="James Thorne" timestamp="20:55">

So by default not enough evidence claim if we don't find any evidence, we could mark that as not
enough evidence. But in reality with our retrieval system, we're finding noisy information from
Wikipedia, which we think is right, which doesn't fully support or refute a claim. So we've had to
negatively sample evidence in that case and train a three-way classifer.

</turn>


<turn speaker="Matt Gardner" timestamp="21:22">

I see. Okay. So you have a model you use, there's nothing even really trained right, for the
retrieval components, where you are selecting documents and then selecting sentences.

</turn>


<turn speaker="James Thorne" timestamp="21:33">

No, we just run it by similarity. And we learn the thresholding parameters within the threshold
which is five documents and five sentences through kind of a good search on the final accuracy
score.

</turn>


<turn speaker="Matt Gardner" timestamp="21:46">

Okay, so you have a model that does retrieval over the corpus to get documents and then select
sentences from there and then you run decomposable attention given the sentence to decided if claim
is entailed, not entailed or not enough information.

</turn>


<turn speaker="James Thorne" timestamp="22:03">

This is correct.

</turn>


<turn speaker="Matt Gardner" timestamp="22:03">

or sorry supported, refuted or not information. Right. This model looks at the sentences you
retrieved, right?

</turn>


<turn speaker="James Thorne" timestamp="22:12">

Yes it does.

</turn>


<turn speaker="Matt Gardner" timestamp="22:14">

Okay, so then if I understand right, your model first does some similarity based retrieval, it finds
some documents then it grabbed sentences from those documents and then given those sentences it runs
a decomposable attention entailment model to the side. If the claim is supported, refuted or there's
not enough information to decide but so, so then this setting, when you say were you have two
evaluation settings, one where you first require the correct sentence to have been selected and then
one where you ignore whether the correct sentence is collected and you just look at the label. Even
in this second setting, this is comparable to the bias. Annotation reflects stuff you're talking
about earlier in the second setting, you're still looking at the corpus, right? You're not just
taking the claim itself on learning a classifier on the claim, giving nothing else, is that right?

</turn>


<turn speaker="James Thorne" timestamp="23:00">

So in the second setting where we're looking at the claim only, I tried to classify by itself and
ignore the corpus.

</turn>


<turn speaker="Matt Gardner" timestamp="23:06">

Oh, I didn't. Okay. I didn't catch that from the paper. That's interesting. I didn't know that.

</turn>


<turn speaker="James Thorne" timestamp="23:10">

I'm sorry. Which, which, no, sorry. Are you talking about the comparison to the SNLI style
hypothesis only artifacts or are you talking about the paper? Yeah, there were, I didn't ask the
question very well, I guess.

</turn>


<turn speaker="Matt Gardner" timestamp="23:24">

Okay. Sorry,

</turn>


<turn speaker="James Thorne" timestamp="23:27">

If we can rewind. So to follow on from your question. The first, setting where we consider the labor
accuracy given the evidence we find is the main scoring objective for the FEVER task. The second
where we consider just the label accuracy, we don't consider it for the rankings on the shared task,
but it's a, it's a diagnostic indicator to see how well are classified does given the evidence we
found.

</turn>


<turn speaker="Matt Gardner" timestamp="23:50">

Yeah. Great. And I totally agree with that. Selecting the correct evidence is the right metric like
that. Yes, definitely. And that's what you should use for ranking. I was just curious about
annotation artifacts and to what extent they're actually there. And it is a little bit irrelevant
because you have to find the evidence to, I'm just curious.

</turn>


<turn speaker="James Thorne" timestamp="24:07">

Yeah. But if we considered just the three-way classification without any evidence on our claims only
we see a similar sort of pattern, the other annotation artifacts datasets despite the fact we've
used a different method for generating the annotations.

</turn>


<turn speaker="Matt Gardner" timestamp="24:25">

Right. Okay. Cool. So how well does your baseline system work when you're, when you use your full
metric where you're actually evaluating the evidence scoring?

</turn>


<turn speaker="James Thorne" timestamp="24:37">

Yeah. So a headline score is about 32% the evidence selection score. Yeah. So a headline figure is a
FEVER score of 32%, which is conditional accuracy given the right evidence. We find if we ignore the
requirement for correct evidence, classified as, it applies the right label about 52% of the time.
We find that the major bottleneck here is the evidence retrieval part of our system rather than the
classifier. But the way we go about training our classifier effects how it works in this noisy
environment where we take evidence from an IR system as well.

</turn>


<turn speaker="Matt Gardner" timestamp="25:16">

So what do you think is the main bottleneck to performance? 30% seems pretty low. I guess extracting
the right claims seems like, or sorry, the right evidence for a claim. If you have a really large
corpus that could be kind of hard. So like what, what's the main, I guess, the lowest hanging fruit
to improve performance here?

</turn>


<turn speaker="James Thorne" timestamp="25:34">

I think the easiest area for improvement is the evidence retrieval system. So at the moment it's
modeled as a ranking problem, TF-IDF, similarity between evidence pages and the claim. And by
changing the system I would expect to see the easiest gains on our final pipeline score.

</turn>


<turn speaker="Matt Gardner" timestamp="25:58">

So 33% 32% seems pretty low for this kind of dataset so I guess if you have to extract evidence from
a large corpus that can be kind of challenging. So maybe it's not actually as bad as it sounds, but
what, having looked at this data set and built a baseline, what do you think is the lowest hanging
fruits here? Like how would you improve the model? The, I think the easiest area for improvement
would be on the evidence retrieval system.

</turn>


<turn speaker="James Thorne" timestamp="26:22">

So at the moment we model it as a TF-IDF based information retrieval system, but I believe there's
much more smart ways to go about doing this. And then I think another compounding factor is the fact
that the intelligent classifiers operated in a noisy environment. And so making this more resilient
to noisy evidence we found could also be an area for improvement.

</turn>


<turn speaker="Matt Gardner" timestamp="26:44">

Interesting. So did, as we talked about earlier, the retrieval component here is entirely like
standard IDF method trained. No, no real model except a threshold. Did you try experimenting with
like even just training the sentence selector given the five documents that you retrieved, does that
work?

</turn>


<turn speaker="James Thorne" timestamp="27:04">

It does and it's kind of a follow up work. I'm planning on releasing so in that case we're modeling
the sentence selection as a textual entitlement task as well, in a joint environment and there's
some interesting gains but it's not as at the moment it's currently not as significant as gains as
I'd have liked to have got.

</turn>


<turn speaker="Matt Gardner" timestamp="27:26">

Any, any teaser on numbers that you get from this.

</turn>


<turn speaker="James Thorne" timestamp="27:31">

Sadly it's only a four or 5% improvement.

</turn>


<turn speaker="Matt Gardner" timestamp="27:33">

Okay. Interesting.

</turn>


<turn speaker="James Thorne" timestamp="27:35">

I think, yeah, the limitations here is also on the fact and that, with only five documents, we can
only fully support or refute 55% of claims in our system. So I definitely think that improving the
initial document retrieval part of the pipeline, would be the easiest opportunity for gains in this
case.

</turn>


<turn speaker="Matt Gardner" timestamp="28:00">

Is that 55% of those that have a supported or refuted label, or is it 50% of the total data.

</turn>


<turn speaker="James Thorne" timestamp="28:07">

Not those which have a supported, refuted label.

</turn>


<turn speaker="Matt Gardner" timestamp="28:10">

Cool. You told us before the podcast that you have a shared task in a workshop coming up on this
dataset. Is that right? Want to tell us about it.

</turn>


<turn speaker="James Thorne" timestamp="28:16">

Yes. So at EMNLP 2018 we are hosting the first extraction on site, sorry, the first workshop on fact
extraction in verification, that's called FEVER. And our website is fever.ai and we're currently
looking for paper submissions on topics related to information verification and information
retrieval and information extraction system descriptions of participants to the shared task. The
deadlines coming up very soon. So yeah, get started on working I guess.

</turn>


<turn speaker="Matt Gardner" timestamp="28:47">

Cool, thanks. This was a really interesting discussion on a nice dataset. Thanks for coming on, it
was nice talking to you.

</turn>


<turn speaker="James Thorne" timestamp="28:52">

Thank you.

</turn>
