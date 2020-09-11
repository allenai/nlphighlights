---
title: "Design Challenges in Entity Linking"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "006"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:12">

Today's paper is titled: Design Challenges for Entity Linking. It was accepted for ACL in 2015
written by Xiao Ling, Sameer Singh, and Daniel S. Weld in the University of Washington. So the
highlight of the paper is that it explains some of the nuances which are often swept under the rug
in the entity linking literature it shed some light on the important ambiguity's in the problem
definition, differences between multiple evaluation metrics and inconsistencies among datasets
commonly used for entity linking. The paper then experiments with a simple method for entity linking
with reasonable performance and answers a number of empirical questions about the importance of
various steps in this method.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:00">

So what is entity linking and why do you care about this problem?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:04">

Right. so entity linking is often defined as follows: given a piece of text, identify entity
mentions and link them to the corresponding entry in a given knowledge base, such as Wikipedia. And
this is an important problem because oftentimes you want to understand the text in a document by
tapping into much more information about the entities described in this document. And by linking
these entities to an existing knowledge base, you get to know much more information about the
entities. You can also start establishing relationships between them based on the knowledge base
relations. And you can infer some relations from the document itself.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:48">

Okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:49">

So an example of this problem would be if your input sentence is the following text "Delta now
offers a direct flight from Seattle to Cairo." So this and this sentence, there are three named
entities, Delta, Seattle and Cairo. This is a relatively easy sentence to do entity linking for. But
even in the sentence you can already see some of the difficulties in defining this task. In
particular it's hard to tell which entities should be labeled and linked to. It seems obvious that
in this sentence, the word flight, even though it is an entity, it doesn't seem important enough to
be linked. But this is not always the case. Oftentimes, especially in specialized domains like
biomedical texts, it's hard to tell whether an entity such as a cell or an animal is important
enough to be linked or not.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:57">

Yeah, I remember a lot of work on Wikification a few years ago and there I'm pretty sure flight
would definitely be linked to a Wikipedia page.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:07">

Right, so this is the first thing that the paper discusses in detail, which is how do we tell
whether we should link an entity to the knowledge base or not? One solution for this is to only link
the so called named entities, which are often proper nouns starting with a capital letter. And even
if we confine ourselves to named entities, do we link all the named entities or only specific types
of entities such as person, location and organization names? For example. Do we consider a fictional
character such as Sherlock Homes to be a person or we only link real people? Another challenge is
how specific the entities we link should be. Consider a sentence, "Adams and Lot will miss England's
game against Moldova in the world cup qualifiers. At first it may seem like "World Cup" should be
linked to its corresponding entity in the knowledge base, but then you may have doubts when you find
that the "world cup qualifiers" also have an entity in the knowledge base.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:14">

Also, the word the world cup has its own entity, has different entities in the knowledge base for
each of the years. So it's not clear really what should be linked here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:27">

And even England's game in that sentence. What should game, so just think about older Wikification
work. If you're trying to be more general about this and link as much as possible. What should you
link this to? England's game? It is a soccer game or football game depending on how you want to call
these things. So should you link it to a page about soccer, should you link it to a page about a
match of soccer or it's actually a particular instance of one of these, it's just not at all clear
what you should do in this linking task for some of these more general things.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:02">

I think that's why entity linking tends to have two sequential tasks where first you decide what is
an entity and then you decide what should this entity link to. Right?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:13">

Right. I agree. But that doesn't really solve the problem. It only makes it like simplifies the
second part. It doesn't really address the problems that paper is highlighting. Yeah. another
problem the paper talks about is autonomy, which is fact that some, sometimes we are fair to an
entity, not by its own name, but by any or some other entity that is associated with it.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:37">

So this is like if I say the White House decided to refer to the people in the white house deciding
to do something.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:43">

Right. That that is a good example.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:45">

That's really common in news articles. Yeah.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:48">

I only came to appreciate these distinctions when I started an annotation project here at AI2 and
realized how difficult it is to come up with concise and accurate guidlines to address these
differences.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:00">

So we talked about how to decide what is an entity and what should it link to. Are there other
problems with entity linking that this paper talks about?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:11">

Right. The paper talks about a couple more problems. The fact that many different evaluation metrics
have been proposed for this task and also many different datasets and there is no clear evaluation
metric or dataset that most people are using, which makes comparing different previous work. Very
difficult.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:36">

This sounds pretty similar to the situation in co-reference resolution, right? Where there's like
B^3, they're all, there are lots of different metrics. We haven't really decided on good metrics.
Well I guess we've kind of arrived at a consensus of using a lot of different metrics altogether
because it's just not clear how to evaluate this. And there also similarly problems I guess co-
reference resolution is a pretty similar problem with entity linking, which is why there sometimes
done jointly and why they have a similar set of issues.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:10">

Right, they have similarities. This paper does talk about like the differences between the
evaluation metrics and like they argue that doing exact match F1 score. So you only get a point if
the boundaries of dimension match exactly to the gold and also the link is correct. But I wasn't
sure, I didn't really agree with all the arguments against the other evaluation metrics. So for
example one metric that is often used is bag-of-concept F1. So this measures at the document level
whether all the predicted links from this document how do they compare to all the predicted links
from the gold annotation? And depending on what you care about, this may be actually the thing that
is important.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:04">

Okay. So you've talked about a bunch of issues with entity linking that this paper brings up, but
what does the paper actually do? Does it just say, Hey, here are a bunch of issues. How does it
explore these? Like what is it, what does the paper say?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:14">

So the paper does propose a method for entity linking. But what I've found most exciting about this
paper is that it spells out these ambiguity's and challenges in, defining the linking problem very
clearly. Now the simple method that they propose is starting with using an off the shelf named
entity recognizer to identify dimensions and then count the number of times every mention has been
used as a hyperlink to link to a Wikipedia page and use the score the entity linking and they found
that this simple baseline actually gives a fairly reasonable accuracy.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:58">

Yeah. When I was reading Wikification papers back in the day, that was pretty much always the most
important feature in all of the methods.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:06">

Right. So they extend this by also factoring in the entity types. So if you know that the dimension,
Washington refers to a person rather than location you have a much better shot at linking it to the
correct entity. And yeah, so they found that using entity types helps, but the caveat here is that
you have to be able to link every to find the entity type of each entity in your in your knowledge
base, which may or may not be easy. Then they also do co-reference resolution to cluster the entity
mentions before linking the entire cluster to one entity. And they re-rank the lengths according to
an additional coherence score to make sure that semantically related links are boosted, which has
been found to be an important improvement in previous work.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:13">

Okay. So it sounds like this paper then gives a list of issues that you have to think about
carefully when building an entity linking system and it does an empirical evaluation of how your
decisions for each of these different options affects model performance. Right? So Waleed you're
working on a new entity linking problem now does this paper give you what you need to make good
progress?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:39">

Personally not. It does. Like I said before, it captures the reasons why this problem is hard for
us. But for example, when we use an off the shelf named entity recognizer these are only available
with reasonable accuracy for a small number of entity types. And once you step out of location,
person, organization, category your doomed basically, and it's not because like we don't know how to
model the other entity types it's just because we don't have enough training data to train these
named entity recognition systems.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:14">

What about that strongest feature for Wikification? The number of times you saw a particular noun
phrase linking to a Wikipedia page.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:21">

Right? So the problem there is this only works for Wikipedia. Most knowledge bases don't actually
have hyperlinks to them from like a variety of web pages. So yeah. So this is again, something that
only works for a particular kind of knowledge base. Yeah. Which really is important. So I suppose
many people will find this useful.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:43">

Even in Semantic Scholar you're trying to build a knowledge base and do entity linking over academic
papers for Semantic Scholar. I guess you can kind of be this as a bootstrapping thing where after
you've linked a few papers you will have links from that paper to your, not Wikipedia, but your
knowledge base. And then you can use that same signal in a kind of bootstrapped way. I think it
still works. You just need, your problem is you don't have a good starting place. You have to
bootstrap this yourself.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:13">

I agree. Yes. I mean, it depends on how accurate these predictions are. Of course, the nice thing
about hyperlinks are they're mostly written by humans, so they're fairly accurate. But yeah, I
strongly agree if we managed to get a decent scene for computing the frequencies, that would be
definitely be an important feature. So I think overall it's a nice paper if you care about entity
linking, but it doesn't really solve the challenges that it presents in the paper.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:47">

All right. Thanks Waleed for that interesting discussion of that paper. Next time, Waleed will
continue this line on entity linking with the paper titled: Capturing Semantic Similarity for Entity
Linking with Convolutional Neural Networks.

</Turn>
