---
title: "Cardinal Virtues: Extracting Relation Cardinalities from Text, with Paramita Mirza"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Paramita Mirza"]
number: "050"
tags: []
description: "ACL 2017 paper, by Paramita Mirza, Simon Razniewski, Fariz Darari, and Gerhard Weikum. There's not a whole lot of work on numbers in NLP, and getting good information out of numbers expressed in text can be challenging. In this episode, Paramita comes on to tell us about her efforts to use distant supervision to learn models that extract relation cardinalities from text. That is, given an entity and a relation in a knowledge base, like \"Barack Obama\" and \"has child\", the goal is to extract _how many_ related entities there are (in this case, two). There are a lot of challenges in getting this to work well, and Paramita describes some of those, and how she solved them.

https://www.semanticscholar.org/paper/Cardinal-Virtues-Extracting-Relation-Cardinalities-Mirza-Razniewski/01afba9f40e0df06446b9cd3d5ea8725c4ba1342"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F399647286&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:05">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:11">

Today our guest is Paramita Mirza a post doctorate researcher at the Max Planck Institute for
Informatics. Paramita is interested in extracting temporal and causal relationships between events,
harvesting common sense knowledge and understanding the semantics of numbers in natural language
text. Welcome to the podcast Paramita.

</turn>


<turn speaker="Paramita Mirza" timestamp="00:33">

Hi, yes.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:35">

Today we will be discussing her ACL 2017 paper. Titled, . So the paper proposes the new task of
extracting relation cardinalities what do you mean by relation cardinalities and why are they
important?

</turn>


<turn speaker="Paramita Mirza" timestamp="00:52">

So maybe I should start with explaining them motivation behind this work. So we started from one
research question related to knowledge base quality on understanding what or maybe more precisely
how much a knowledge bases know and how much they don't know. Which is the research topic of my
coauthors, Simon Razniewsk and Fariz Darari. So one of the many ways to answer that question is to
find such information in the web. Which are often available in the form of a structured text. And
this is how I got involved because of my experience in information extraction from natural language
text and extraction information from unstructured text for populating knowledge bases has been a
longstanding research on its own right. But to answer the question of how much a knowledge base
knows or should know, we don't really need to find that for example Ivanka, Eric are in the child
parent relation with Donald Trump. We just want to know how many entities are in the child parent
relation with him and such information are often express with sentences like Trump has five children
from three marriages or she just won her second Oscar for example.

</turn>


<turn speaker="Paramita Mirza" timestamp="02:12">

So these expressions are often used, especially for long tail entities where a non-important person
is mentioned to have three children, but their names are unknown because they don't really matter.
And this is what we call relation cardinality. So the number of objects that are in a certain
relation with a certain subject. So, naturally we start with investigating the appearance of
cardinal numbers in text, since it is the most common way to express relation cardinalities. There
is research going on with trying to interpret cardinals or numerals in text. But mostly they are
related to the temporal expressions like a period of two months, 10 days and so on and also physical
quantities are measured such as how much is $131 million dollars. It about the cost to employ
everyone in Texas over a lunch period. This is taken from Chaganty and Liang's paper at ACL 2016.
But yeah, there is not so much going on for extracting relation cardinalities despite its usefulness
for, as I mentioned previously knowledge base relation or for question answering, for instance on
answering which US presidents were married at least twice and also despite its frequent occurrences
in text. So our study for this paper estimated that actually around 19% of numbers in Wikipedia
articles are relation cardinalities.

</turn>


<turn speaker="Matt Gardner" timestamp="03:48">

Yeah, I guess so I did my thesis on the NELL project where we were trying to build a knowledge base
that was extracted from a bunch of texts and it was, I guess it's called the Never Ending Language
Learning. So it was supposed to keep extracting every day more stuff. And the question you have
there is when is it done for a particular relation? Like how do we know when it's found everything
like, there are eight or nine planets, depending on how you define planets. If you want to expand
that to exoplanets, maybe there are a few thousand or whatever. But for some relations you can try
to guess how many things there are. We can give that information on priori, but if you can extract
it from text then presumably you could do a better job at like bounding the growth of NELL or
similar knowledge bases, like understanding what's going on. So yeah, really interesting problem.

</turn>


<turn speaker="Paramita Mirza" timestamp="04:43">

Yes, exactly. So yeah, our motivation is to improve relation extraction for example. So, as you
said, it can be used to estimate how many things should we extract from the text for relation
extraction and when we are already complete, then we should just stop extracting instead of
expecting more false positives.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:10">

Right. So thanks for bringing up the NELL project. So in the paper you mentioned that the NELL
tuples sometimes include things like Berlin 2016 attack has number of victims, 32 and also tuples
from OpenIE Such as like Obama has two children. How are these kind of extractions different from
what you're trying to do in this paper?

</turn>


<turn speaker="Paramita Mirza" timestamp="05:35">

The OpenIE methods, the one extract for example, this Obama has two children. The methods fail in
understanding that two is actually the number of children of Obama. It's just, well you need further
processing right to understand that this is actually the relation cardinalities. Of course the
output of OpenIE methods can be used to extract such cardinalities, but yeah, the method itself
currently stops at that, at extracting such phrases, without understanding it more.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:16">

Do you expect using OpenIE as a preprocessing step and like funneling the output through another
process to find the cardinality. Do you think that would be a reasonable way to approach this
problem?

</turn>


<turn speaker="Paramita Mirza" timestamp="06:28">

That is one approach. So that's ideally we want to try to make sense of all numerals that appear in
the text. Right? So in that case, one approach would be to employ OpenIE to extract the facts or
relations and then to understand what the numerals correspond to, but then it would require us to
solve the numbers to predicates. So say predicates and that's in general OpenIE says it's to map
OpenIE results to predicates are difficult pass, right? So yeah, that's why we turn the problem
around. So we start with predefined relation and a subject. And then what we are trying to estimate
is how many objects should exist for a certain relation and that subject.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:27">

Right? So the paper focuses on four predicates, trying to predict the correct number of children,
spouses, parts or administrative territorial entities.

</turn>


<turn speaker="Paramita Mirza" timestamp="07:37">

Yes.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:38">

Why is it important to predefine the list of predicates instead of keeping it open?

</turn>


<turn speaker="Paramita Mirza" timestamp="07:45">

The goal of our experiment is to show that we can build the model to extract these relation
cardinalities from text. And the chosen predicates are the ones that we know that the relation
cardinalities are indeed expressed in the text for such relation. So yeah, that's how we choose this
four relations.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:10">

So the reason has to do with collecting label data then, right? Because these are the predicates for
which it's was able to collect in an easier way. So that brings us to the question of how do you
plug the label data? Could you elaborate on this?

</turn>


<turn speaker="Paramita Mirza" timestamp="08:25">

Right. So be focused on this Wikidata predicates. So they use Wikidata as our knowledge base and
Wikipedia articles as our source text for evidence. For predicate we collected the subject entities
for which the relation exists for them. And then we count the number of objects that are in relation
with the subject. We do it for each subject in the knowledge base and also for each subject we
collected the sentences in their corresponding Wikipedia articles that contains numerals or
cardinals in our case, in this work. So after that, then we generate the training data. So positive
and negative examples, by labeling the numerals in the text that matches the object count from the
knowledge base and if it matches then we consider it as a positive example. If it doesn't match then
as a negative examples.

</turn>


<turn speaker="Matt Gardner" timestamp="09:36">

How good is that assumption? Did you try to quantify how often this distant labeling scheme actually
worked?

</turn>


<turn speaker="Paramita Mirza" timestamp="09:44">

Well for a system using distance supervision is that a manual labeling is tedious and for relation
extraction, this supervision approach is often used so, and he thought that we have the knowledge
base ready so maybe we can just use the information from the knowledge base as the gold standard.
But as we proceed with the work we explained in our analysis, that using the knowledge base counts
as our gold standard is, it's not really a good idea because knowledge base is incomplete in itself.
So yeah. We must do some techniques to deal with this incompleteness in the knowledge base if we
want to use this as a gold standard.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:43">

So I'm curious to know is there, so just to make sure I understand you check the relation. For
example, when you talk about children, you check the relations, for example, Barack Obama child X
and Barack Obama child Y. And then if you have two of these in the Wikidata, then you assume that
the cardinality in this case is two and then you would go in the text and label any number two in
the Barack Obama Wikipedia page as a positive example, is that right?

</turn>


<turn speaker="Paramita Mirza" timestamp="11:18">

Yes.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:19">

So I'm curious to know, is there also a, like in Wikidata properties that tell you the number of
children or actually the count that you are interested in and then you can use it as maybe a
stronger signal for distance supervision.

</turn>


<turn speaker="Paramita Mirza" timestamp="11:34">

So for number of children, fortunately, yes, there is a relation called number of children, but this
is not, it exists not for all relations in Wikidata. So only for a certain relation. And this, of
course we can as our gold standard. And we showed that using this value from, from the Wikidata as
our ground truth results in better performance for the models.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:07">

So when you train the model with this instead of counting the number of triples that exhibit this
relation, you get better results. Is that what you're saying?

</turn>


<turn speaker="Paramita Mirza" timestamp="12:16">

Yes, we get around 10% improvement in F1 score.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:23">

The other thing that troubles me about this is the lower the numbers are like, I think that this
assumption is reasonable when the number of relations is high. Like if we're talking about the
sixties chances that there's another thing that has a count 67 is very like low, but there are many
like many things that come in pairs. So if this person has two children, then it's also likely that
the numeral two would be incorrectly labeled as a positive example. Any thoughts on how to limit the
severity of this assumption?

</turn>


<turn speaker="Paramita Mirza" timestamp="12:58">

So we tried also to understand which numerals can be useful for the learning methods and also which
triple count can be useful for example as you said, like numerals one it occurs very frequently in
text. It's used in a lot of phrase like at one time or in one step or yeah, there is just a lot of
"one" in text. And so the idea is to understand which one, which numerals are not really so useful
for the learning process and try to exclude that from the learning the same also with the triple
count, for example we found that for the spouse relation from the knowledge base, there are a lot of
entities of subject entities that have only one spouse right, one or two. And then when we go into
the text and we try to label one and two as positive examples, this will create a lot of noise for
the learners. And so yeah, we should also try to understand which triple count is the best for each
relation. Maybe for a spouse we could start from like a three spouses are a good way to estimate or
to create the positive examples, for example.

</turn>


<turn speaker="Matt Gardner" timestamp="14:34">

This is interesting, it just highlights the difficulty of distance supervision in general.

</turn>


<turn speaker="Paramita Mirza" timestamp="14:38">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="14:39">

For some relations it's a really reasonable assumption. Like, if your relation is city and country,
city located in country, if I ever see a city in a country in the same sentence, it's very, very
likely that this relationship is being expressed because you're not going to, almost never you will
you see Paris and England mentioned in the same sentence. You just don't, you just don't say that.
And so for some relations this really works and for some relations it really doesn't. And so it's
just really interesting. I hadn't really thought of this cardinality issue and how, how it would
affect distance supervision. But yeah, it seems really challenging to get this to actually work.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:17">

Right. So moving to the model the CRF (Conditional Random Field) based model you proposed in the
paper, could you give a brief description of the model, what features you use?

</turn>


<turn speaker="Paramita Mirza" timestamp="15:25">

So there are two steps in extracting a relation cardinality, first we want to identify the numerals
in the text that correspond to relation cardinalities, and then if there are several evidence in the
text and we want to consolidate them into a single number, so we only want to extract number of
children of Trump. So for identifying the numerals, the cardinalities in text. We approach it as a
sequence labeling pass. And so as a feature set, we used the context lemmas around the observed
token T, so the current token and then the bigrams containing token and also to trigrams containing
the trained token, that's the feature set. Yes, we'll learn to label token as a relation cardinality
or not. So this is just binary classification.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:29">

And do you feed it the full document or only the sentences which have numbers?

</turn>


<turn speaker="Paramita Mirza" timestamp="16:36">

Only sentences containing numbers or numerals.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:40">

One more detail there. Would it make sense to feed also as input since you already know, on a
particular page, you know, who is the subject that you're interested in? And I was curious. So if
the same documents, maybe says the number of children Barack Obama has, and also Bill Clinton has
but the page is about Barack Obama. So you probably want to only extract from the former one. Is
there any features that helps you do this?

</turn>


<turn speaker="Paramita Mirza" timestamp="17:09">

Yes, that's the consolidation part problem. So in this work we just use a simple method choosing the
cardinals, or the numerals identified with the highest marginal probability. So if in the in one
page of Barack Obama, there are several evidences or seven sentences containing numerals that are
labeled as cardinalities and we just choose the one with the highest probability. And this is of
course, again, not a great assumption, but yeah, there's a lot of ways to improve this for example
by resolving the subjects of the statements, for example, the following that in a text, sometimes
even if it's about a certain person, the statements about children, it's actually related to the
person's parents or the persons siblings its nothing related to the person. Right? So one idea would
be to first understand what is the subject entities of the statements and then to connect the data
defined cardinalities to the subject.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:35">

And how about the different kinds of predicates that you deal with, do you have different labels for
them or are they trained in separate models?

</turn>


<turn speaker="Paramita Mirza" timestamp="18:44">

For each relation we train a separate model. So yeah, the classification will be just for a certain
given a relation, whether it's a cardinality of that relation or not.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:57">

Interesting. Yeah, it's a very interesting task. I think. There's a lot of future work that can be
done to address this problem. Can you give us a brief, recap on the key results in the paper?

</turn>


<turn speaker="Paramita Mirza" timestamp="19:09">

Yes. So for in this paper we two experiments related to on how to improve the identifying part. So
first one is just to regard all numerals in the text. And the second setting is just regard only the
numerals that modify something. So here what call the only-nummod. So the numerals is in the numeric
modifier relation according to dependency parsing. Yeah. So for has child relation currently the
Vanilla setting achieve 14% F1 score. But when we limit the numerals that we only consider the
numerals modify something, modify the nouns, for example, then the achievement improvement up to
26%, F1 score for child relation, the most difficult relation according to the experiments is for
spouse relation, for which we only get less than 10% F1 scores are only 2% F1 score. And this is
because for these relations expressing for spouse relation expressing relation cardinalities,
numerals rarely happen. It is more common to express the relation cardinalities with ordinals. For
example "John's second wife Mary" means that from these ordinals we can infer that the number of
spouses was at least two. And so, yeah. So this is one of the challenges that we encountered after
we analyzed the results.

</turn>


<turn speaker="Matt Gardner" timestamp="21:25">

So I see that your baseline number that you report for spouse is zero. What about just taking the
majority label, which might be one or two or zero? I'm not sure what it would be in your data, but
how well does that perform?

</turn>


<turn speaker="Paramita Mirza" timestamp="21:40">

Yeah, we didn't really experiment with that's, so our baseline, just because the idea is we'll
extract the information from the text. Right? So we can of course analyze from the counts in the
knowledge base. So if in the knowledge base, we know that most people have one spouse, then we can
say, okay, if there is a person then definitely one spouse. We didn't take that as baseline because
what we want to make sure here is how well we can we extract this kind of information from texts. So
from, yeah, so our baseline is just taking random number in a person page as the cardinality.

</turn>


<turn speaker="Matt Gardner" timestamp="22:29">

Yeah, that's a good point. It highlights the difference between what you might call relation
extraction and knowledge based completion or slot filling where one of them just cares about the
final truth value that you end up with. And the other one cares about understanding the meaning of a
sentence in some sense. Right. And so getting the final truth value might be relatively trivial.
Whereas actually understanding the sentence as a whole lot harder.

</turn>


<turn speaker="Paramita Mirza" timestamp="22:53">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="22:54">

Yeah, that's a good point.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:55">

Yeah. But there is also an aggregation component in this work, right? Because even if you understand
individual sentences, sorry if you're understand half of the sentences or all the sentences in this
document, this may not be all the information you need. You may need to aggregate information from
multiple documents in order to reach the correct cardinality. So yeah it's a difficult problem.

</turn>


<turn speaker="Paramita Mirza" timestamp="23:19">

Yes. So this is also, yeah, this is exactly one challenge that we found. So regarding this
conditionality. So what you mentioned is aggregating numbers from different documents, right? But
even in a single sentence, we can label several numbers as cardinalities, which often happened for
several relations like children, often the sentences are for example, they have two sons and one
daughter together. So here you have to sum up the number, but the numeral is to reach the final
number.

</turn>


<turn speaker="Matt Gardner" timestamp="23:57">

An interesting thing that we ran into with NELL was facts change over time. So if you're trying to
predict who's the president of which country, NELL only has the capacity to represent one person in
that relation, which seems kind of silly because that's going to change over time. Right. And I
don't know, it seems like you might have that problem even worse here when you're trying to predict
cardinalities of things. But I'm not sure if it's actually worse or not, but do you have any
intuition on how hard it is? Like how often these things change? How temporally dependent this
cardinality is.

</turn>


<turn speaker="Paramita Mirza" timestamp="24:30">

Yes. For some relations, like a number of spouse, children, this is highly dependent, it evolves,
right? This kind of information. So definitely yes. But here that's why we use the Wikipedia
articles. So the hope is that the source is already updated. So what we extract is already like the
latest information that we can get. This assumption will definitely change if we try to extract this
relation cardinalities from the web. So from various texts, from news, from a lot of other texts
other than, Wikipedia articles for sure.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:17">

Do you have any other thoughts on this work before we conclude?

</turn>


<turn speaker="Paramita Mirza" timestamp="25:21">

Yeah, so in the beginning, when we started, so we started with numerals right, just numbers for
extracting relation cardinalities. But then once we dive into the, looking into the text and which
sentences can actually express relation cardinalities, then we found that first ordinals can also
express cardinalities, but then with ordinals we have so be cautious since it's not expressing the
exact cardinalities, but like the lower bound of cardinalities and then there are also other number
related terms, like twins for example, for two children, like having twins which means having two
children. Also when we want to extract the zero cardinality, like she never married. This is
something, so there is no number at all there, but for sure this kind of statements or sentences or
phrases actually express the cardinality of spouse relations. So from a linguistic point of view,
there are a lot of other expressions that we can play with and this is interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:41">

Yeah, I really like this task because it highlights something that is very linguistically hard to
capture. Like it's hard to define one linguistic phenomena that captures this task at the same time.
It's a very useful one. I can imagine like you mentioned, many ways we can leverage this information
if we're able to reliably extract it. So yeah, I'm very excited to see what future research will be
done on this data. So thank you very much for doing this work and it's been a great pleasure talking
to you.

</turn>


<turn speaker="Paramita Mirza" timestamp="27:16">

Sure, thanks a lot for the opportunity.

</turn>
