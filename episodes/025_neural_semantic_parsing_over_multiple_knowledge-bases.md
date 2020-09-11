---
title: "Neural Semantic Parsing over Multiple Knowledge-bases"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "025"
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
Artificial intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:11">

All right. Today's paper is titled Neural Semantic Parsing over Multiple Knowledge-bases. This is a
paper by Jonathan Herzig and Jonathan Berant at Tel Aviv University in Israel. This paper I thought
was interesting and really nice and a paper that seemed obvious in hindsight and I was like, Oh duh,
of course it's going to work. Why didn't I think of this? The gist is that there are a lot of
constructs in semantic parsing. Okay, let me back up a little bit. Semantic parsing is the task of
going from a natural language sentences or text to some symbolic, some logical representation of
that that can be executed against some execution engine. So think question answering against a
knowledge base or the domains that they use here are some system that has a database and tries to
answer user queries, like find a housing unit that is no more than 800 square feet.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:07">

So like some use natural language interface to like a Zillow backend or some New York times
database. Another example question is find an article with no more than two authors. And this is a
query against a database of publications like, I dunno, a New York times or Semantic Scholar or
whatever. And these natural language utterances find a housing that is no more than 800 square feet
get converted into some logical form. Something like an SQL query that gets executed against a
database containing the data that you can answer the question with like all of the housing units for
instance. The interesting thing is getting annotations of these logical forms is hard or relatively
expensive because you need people that are familiar with a logical form enough that they can
actually write down the logical form.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:02">

And that means we don't have very many of these annotations, but it's still the case that things
like quantifiers things like no more than, or the most should have pretty database independent
logical form representations. So the most means I'm going to do some quantification and do an ARG
max over some thing, right? And so being able to map "most" to an ARG max or something similar or
"no more than" to a less than operation in your logical form language, these things are consistent
across the database that you're using as your back-end almost certainly. And so if you can augment
your data by having a joint model that learns on several different datasets with different database
back-ends but similar logical form languages, you can do better at learning this mapping from text
strings that talk about quantifiers to the actual quantify symbol.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:05">

So they show just in their first example figure they have four domains listed, housing,
publications, restaurants and calendars. These are four different databases. And the mapping from
like noun phrases like article and author to a database columns and rows are going to be different
between the different databases, but the quantifiers that your use are going to be the same across
these different databases, which is why training some domain adaptation model is helpful. So this
now brings us to what this paper actually did. They said, here we have these disparate datasets.
Let's do some really simple domain adaptation in the vein of Hal Daume's frustratingly simple domain
adaptation where you have some piece of the model that learns jointly across all domains and
essentially duplicated features or duplicated feature extractors that apply to domain specific
problems. And they learn these two things jointly and that's it. They show that it works well. Like
it helps particularly with these quantifiers. And it works

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:17">

And are the quantifiers one of the more difficult things to parse in semantic parsing is this, why
this paper, like getting them right or improving, making improvement on them is an important
contribution.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:30">

Yes. So you can imagine housing, if I have a housing database, if I say find a house, it's really
easy to map house to housing unit because there's a whole lot of string overlap. There isn't any
lexical overlap between the most and ARG max. And so heuristics will get you most of the way for
like mapping named entities or column names that you see in texts to the actual strings that you
need to use in your logical form language. But it's the stuff in between the glue that holds these
pieces together, it's harder to learn. And if you get more data you can do it better. And this is a
way to share data on those pieces without needing to share data on the mapping from named entities
or noun phrases to columns in your database.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:17">

Yeah, that's interesting. And for this to work, we need to make sure that the different datasets all
use the same kind of logical forms or at lease are convert to the same format?

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:29">

Yeah, definitely there is that issue. So if the databases that you're trying to execute on are
sufficiently different than you're going to have a hard time with this. So Jacob Andreas' neural
module networks for visual question answering also have, like, you could think of this as a semantic
parse of the question that gets executed against the image in some sense. It'd be really hard to
think about how to share those kinds of mappings with executions against some SQL database. Right.
Even if the question is like, find me the most red part of the image or which object in the image is
the most red. I'm kind of making this up, but you can imagine quantifiers that ask about things in
image. It's a lot harder to think about how to share this learning between these SQL Lambda-DCS
databases and this visual question answering task, even though they're both doing semantic parsing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:31">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:32">

Okay. So let's talk briefly about the experiments that they ran in this paper. As I said before,
they use this like frustratingly simple domain adaptation idea, in the context of a neural network
the way that this works, they used an encoder decoder kind of framework, a sequence-to-sequence
model where you encode the natural language utterance using some biLSTM or similar. And then you
decode using an LSTM to produce the logical form and they use this representation called lambda-DCS.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:08">

The way that frustrating simple domain adaptation works in this setting is you have a domain
specific encoder and a general encoder. The general encoder gets used for all domains. And the
domain specific encoder gets used only for each domain independently. And so when you're training on
one domain, you have two encoders, the domain specific one and the general one, they both get used,
they both do feature extraction and then their combined hidden state gets passed to the domain
specific decoder. And that when you switched domains you switch the domain specific encoder and
decoder, but keep the general encoder. Okay. Just a really simple model vanilla sequence-to-sequence
stuff. Okay. For the experiments, they use this dataset from a paper by Percy Liang's group a couple
of years ago. The paper was titled Building a semantic parser overnight.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:07">

This paper was about how do you build semantic parsers quickly by getting annotations easily. And it
resulted in a collection of eight different domains with specific databases that had on average a
little less than 2000 sentence logical form pairs per domain, there were eight domains and so they
use this dataset, in total there were a little over 13,000 examples. The domains are things like
basketball, clocks, calendar, housing, publications, recipes, restaurants and social and I gave you
some examples of the kinds of statements that they're trying to parse. So when they run experiments
on this the simple thing you can do, I guess there are two really obvious baselines. One is take
each data set independently and learn a simple sequence-to-sequence model that goes from the input
language to the output tokens, the output logical form and learn that the models individually
compute accuracy on each individual dataset average the results.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:13">

When you do this, you get 75.6% accuracy. The other obvious baseline is to take all of the data,
pretend that there is no difference between these domains and train one encoder and one decoder on
all of these together. And if you do this, there's one little detail you should read about in the
paper, but if you do this, you get a 78.3% accuracy. And so you get a significant increase by just
lumping all of your data together and pretending there's no difference. But if you're a little bit
smart about it and use this frustratingly simple domain adaptation idea, you get an additional 1.3%
improvement. So you go from 78.3 to 79.6, which is not huge, but a nice result.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:00">

So there was an area hypothesis in the paper that this method helps with the quantifiers because
they're shared across all the domains. Are there any results to back up this hypothesis?

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:14">

Yeah, this is a short paper. So they didn't have that much room for really detailed analysis. But
they do say that there are a significant number of cases where they do better on comparatives and
superlatives, which are these quantifiers that you need to worry about with the domain adaptive
version versus the independent version. They didn't specifically compare against the version where
you train all of them together. So that's a little bit disappointing, but this is a short paper.
They didn't really have a lot of space for like detailed comparisons.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:48">

All right. Thank you Matt for presenting this paper. Next time we'll have Yoon Kim with us to talk
about his paper titled: Structured Attention Networks.

</Turn>
