---
title: "Entity Linking via Joint Encoding of Types, Description and Context, with Nitish Gupta"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Nitish Gupta"]
number: "033"
tags: []
description: "EMNLP 2017 paper by Nitish Gupta, Sameer Singh, and Dan Roth. Nitish comes on to talk to us about his paper, which presents a new entity linking model that both unifies prior sources of information into a single neural model, and trains that model in a domain-agnostic way, so it can be transferred to new domains without much performance degradation. https://www.semanticscholar.org/paper/Entity-Linking-via-Joint-Encoding-of-Types-Descrip-Gupta-Singh/a66b6a3ac0aa9af6c178c1d1a4a97fd14a882353"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F347209565&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Today we, our guest is Nitish Gupta. He was going to talk to us about his EMNLP 2017 paper titled:
Entity Linking via Joint Encoding of Types, Descriptions, and Context. Nitish is a third year PhD
student at University of Pennsylvania where he is working with Dan Roth and Sameer Singh. It's a
pleasure having you with us today Nitish.

</turn>


<turn speaker="Nitish Gupta" timestamp="00:36">

Thanks a lot for the invite. I'm happy to be here.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:39">

Can you tell us an elevator pitch about this paper?

</turn>


<turn speaker="Nitish Gupta" timestamp="00:44">

Okay, sure. So entity linking is a longstanding problem where you would want to ground mentions of
entities in text to a knowledge base. So apart from all the challenges, so an elevator pitch for
this paper would be we try to encode different information sources or evidences for an entity in a
joint representation for this entity. So, let me give an example and probably that would make it a
lot clearer. So if you have a string, a sentence that says "India plays in a match in England
today." So here you have two entity mentioned which is India and England. But just by looking at the
sentence a human [doesn't] know that the information India doesn't refer to the country, but rather
a sports team or something else, but not exactly the country. So this makes the problem challenging.

</turn>


<turn speaker="Nitish Gupta" timestamp="01:41">

But on the other hand, you know, some from the sentences that England refers to a location in this
sentence. So what we, so this shows that what you want to do, an entity linking or what the
requirement is that you need to understand that India is probably a sports team if England is
location. You need to read the other contexts around this mentioned to find out that what the sport
is for example, to refer this mentioned India to the correct entity. And you also need to read the
description of entities from an encyclopedia source. Say Wikipedia to understand that, say India
cricket team is a sports team. And that could be written down as India in text.

</turn>


<turn speaker="Matt Gardner" timestamp="02:31">

So can we back up just a minute? So when you're saying when you say entity linking, what you mean is
we have some piece of texts and we have some collection of entities in some knowledge base and we
want to find which words in this text refers to entities in the knowledge base. Right. So you've
been talking about this India example. My question is where do we get this knowledge base like it,
are you just talking about Wikipedia? Do we have other kinds of datasets?

</turn>


<turn speaker="Nitish Gupta" timestamp="02:59">

Oh, Sure. So there are so many knowledge bases around, so Wikipedia, Freebase, Wiki data, there are
other medical knowledge bases, but usually, at least in literature, a lot of work on aggregating
data has been focused, is trying to link to Wikipedia. And hence there are a lot of papers that also
call this problem Wikification .

</turn>


<turn speaker="Matt Gardner" timestamp="03:19">

So are the methods that you're using specific to Wikipedia? Could you use this with other things?

</turn>


<turn speaker="Nitish Gupta" timestamp="03:25">

Yes. So we could use this with other knowledge bases and I, yeah, that is one good part about I
think this model is that it is kind of not knowledge based agnostic, so you just need different
kinds of evidences. So even in our model we use two different knowledge bases. So we use the entity
description of the textual description from Wikipedia but we use the fine grain types of entities
from Freebase. So you can get information about these entities from any source available. And the
idea is to jointly encode them in a tense representation for each entity.

</turn>


<turn speaker="Matt Gardner" timestamp="04:01">

Okay. So I guess you can use any kind of knowledge base that has the kinds of information that
you're trying to encode. So can you remind us what are those different kinds of information that
you're encoding?

</turn>


<turn speaker="Nitish Gupta" timestamp="04:12">

Sure. So in our paper, what we do is as I said, we take the entity description, so say the first
paragraph of each entity on Wikipedia, the third come from anywhere. We encode this using a
Convolution Neural Network into a dense representation. So this is one kind of encoding. The other
is the context in which this entity occurs in. So again, we exploit Wikipedia for this. So Wikipedia
text has hyperlinks to entities which are kind of these gold annotations for linking. So we know
what kind of context this entity is mentioned in so we encode this context using an LSTM into a
dense representation. These two sources are unstructured plain text sources. Then we have the
structured source of information, which is the fine grain types from Freebase for each entity. And
we encode these types. There are multiple types for each entity. We encode this into a dense
representation. And then our objective is that for each entity we need to learn our representation
for an entity which is closer to all the, all of these three sources.

</turn>


<turn speaker="Matt Gardner" timestamp="05:22">

So, when you said you have links to Wikipedia at first thought that makes me think this is specific
to Wikipedia, right? Cause what other kind of knowledge base is going to have these Wikipedia links
that you can just extract. But actually on second thought what that really means is just you have a
few annotated mentions each entity in some texts somewhere and you're describing the local context
around some piece of texts that I know refers to an entity in the knowledge base. So I have to have
done a little bit of work with some new knowledge base to have labeled a few instances of each
entity in the text so that I can use it as data. Is that right?

</turn>


<turn speaker="Nitish Gupta" timestamp="06:01">

Oh partly, so for example, if you have Wikipedia that is enough for you for getting local context.
So for example, if you have a new knowledge base, so you have Freebase and want to encode the
relations for entities, right? And there are, and there are new entities for which there are say no
Wikipedia pages even then this method would work. So for example, if you have a set of entities in
Freebase and a subset of them occurs in Wikipedia. So for that subset you have say two sources of
information, the local context from Wikipedia and the Freebase types. And for the other set, you
only have Freebase types, but this joint encoding you can still do. Which goes to show that this
model is actually robust to this incomplete information. You don't need all sources of information
for all entities.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:56">

I wonder how much you lose by giving away the context information. So let's say you have only types
for a new entity or maybe you only have a description I wonder how much each of these different
components of the entity encoding contribute.

</turn>


<turn speaker="Nitish Gupta" timestamp="07:16">

Oh good question. And we have we have done study for this in the paper, so we call this the cold-
start setting. So yeah, so let me just give a primer for this, now that you have learned entity
representations, but your knowledge base is increasing day by day. And the first piece of
information you would probably get is a description end type and not this linked text. So what we do
is we take out a lot of rare entities from Wikipedia, don't see them at training at all. We train
our model and then we don't want to retrain it. You only want to initialize or learn these new
entity representations only using description end types. And we don't do it a lot. So we tested this
on the Wikipedia data and our performance from around 88% goes to around 80% when we use only
description end types, but a good point to not here is that these are very difficult mentions in
which the prior and we don't use any kind of priors. And there are at least around six candidate
entities for mention string. So it is indeed a difficult setting to evaluate on and we don't lose
much. I hope that answers your question.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:30">

Well, how does this compare to the setup where you actually have multiple mentions, so the 79.5 what
number two should we compare it to?

</turn>


<turn speaker="Nitish Gupta" timestamp="08:41">

You should compare it to the 88 in the paper. Not the most fair comparison, but still, yes, that is
kind of the ceiling that you can compare it to the 89 for Wiki.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:54">

Okay. So in table three, you show that the entity description only will give you about 65 percent
accuracy adding only the fine-grain types give you a 73.7%. So it seems like adding each of the
description, fine-grained end types and also dimensions contributes significantly to to the accuracy
to improving the accuracy.

</turn>


<turn speaker="Nitish Gupta" timestamp="09:19">

Yes. So, so again, in that table the last row says 79.5, which is many joined encoders with their
end types. Yeah, so out of each of the information sources. Yes, definitely gives you more
improvements.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:32">

So one thing that's not very clear to me is how do you combine multiple mentions? So I think in the
key to this is a equation number one, where you describe the, the probability, so the joint log
likelihood of the model as the sum over all dimensions. And for every mention you compute the
probability of the correct entity that this mention should link to. And then you have a number of
candidates, you sample negative entities to estimate this probability. So my question is; does this
benefit or harm particular entities which show up in a lot of mentions? So what is the effect of
this formulation of the loss function regarding entities with various degrees of with various
frequencies?

</turn>


<turn speaker="Nitish Gupta" timestamp="10:41">

Okay, good question. We didn't do explicit experiment for that were we would evaluate based on the
frequency of the entity. But I would want to say I hope, I don't think it should affect a lot, that
is it should not negatively affect it. Obviously more data is always helpful, but it should not
negatively affect it.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:02">

I see. Okay. So basically you adapt the information, the different components. So if we have
multiple pieces of information, we just add it up, which in the log space it amounts to multiplying
the probabilities for these entities.

</turn>


<turn speaker="Nitish Gupta" timestamp="11:20">

Yes,

</turn>


<turn speaker="Waleed Ammar" timestamp="11:22">

It's kind of what we do when we're learning embeddings also for the most part for example, in skip
gram models we're doing also the same thing and different works will have different frequencies.

</turn>


<turn speaker="Nitish Gupta" timestamp="11:33">

Right.

</turn>


<turn speaker="Matt Gardner" timestamp="11:34">

So if I could summarize a little bit to see if I'm understanding this right. So you're trying to
find which entities in text map to which knowledge base entities. The way you do this, is you build
a model that embeds entities using different kinds of information from your training data, like you
look at local context, around labeled instances, you look at the types and the knowledge base for
this entity and other kinds of things. You've learned an embedding model that trains entity
embeddings to match the encoding of the local context and the encoding of the entities types and
other things. And then at test time you get some candidate entities and you look at the local
context of the mention and you find the best match to the entity embedding. Is this right?

</turn>


<turn speaker="Nitish Gupta" timestamp="12:24">

Yes. So you use the already trained local context encoder, you would encode this test context and
then you would find the nearest neighbor in some sense of the candidates.

</turn>


<turn speaker="Matt Gardner" timestamp="12:37">

So it's been many years since I read since I followed the entity linking Wikification kinds of
papers. It seems like those papers use very similar kinds of information to what you're doing here.
So is that true? Like are you using different information or are you just encoding it differently?
Like what's novel about what you presented in this paper?

</turn>


<turn speaker="Nitish Gupta" timestamp="12:59">

Sure. So the first one I don't think there's any work which used all these informations jointly.
There have been work which used description and context, or types and context but not also sources
jointly. And and so the other good part about this as which was different from other models is that
it is very modular. So it is very easy to add new sources of information which also makes it very
robust to incomplete information. So I think that is what I would call the novelty of this work as,

</turn>


<turn speaker="Matt Gardner" timestamp="13:36">

Okay.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:36">

When I first read this paper, I got excited because it evaluated on multiple different evaluation
sets without adapting the model to each of them. So I feel like that's a major contribution of this
paper. Do you have any comments on this?

</turn>


<turn speaker="Nitish Gupta" timestamp="13:56">

Sure. yes, exactly. So I completely agree with that. So the hope on using these complex neural
networks is that they generalize well to different kinds of data. But most of the work in EL doesn't
exactly evaluate on that. Most of the prior work would train different models for different
datasets, train them on the manually annotated data. Whereas we only try to use the incidental
supervision already available freely on Wikipedia and still show that it performance comparable
across datasets. Which I think is definitely needed in a large scale. Information extraction model
like entity linking because your label space changes so dynamically with different datasets, so you
can be kind of overfitting to the peculiarities of different datasets. And that might not generalize
to different data.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:53">

So that's a good segue to tell us a little bit more about the dataset that you actually used for in
the evaluation of this paper.

</turn>


<turn speaker="Nitish Gupta" timestamp="15:01">

Sure. So the first evaluation the most important one is that we show that adding different sources
of information and combining them jointly actually yields into a better entity linker. So when we
say just use context, we get a certain performance, but adding description end types of jointly
helps perform better. We also show that we perform or outperform current state-of-the-art methods on
three or four of the datasets. Then as I alluded to before we show that this model can be extended
to working on new entities by just using the description or types without having to retrain any of
the previous trained model. Then we also had the small evaluation where we show that it is also able
to do competitive fine-grain type prediction for mentions. So that there is this other objective of
which we don't exactly evaluate on or we don't optimize on that exactly. But we still can do very
good finder end type prediction. So the smarter can also be used for that.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:17">

So among the four datasets that are used in, both are described in section 5. There is the Wikipedia
dataset is not, I don't know if it's a fair comparison because you are trained, you, you're training
on Wikipedia you're training the entity embeddings on Wikipedia. And there, there may be some
overlap between the innocences used in this evaluation and those used in training or did you make
sure that there is

</turn>


<turn speaker="Nitish Gupta" timestamp="16:44">

No, yeah, we made, we made sure we took out all the tests set of Wikipedia from our training data.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:50">

Perfect. I see. And the ACE datasets are based on news, is that right?

</turn>


<turn speaker="Nitish Gupta" timestamp="16:56">

Yes, yes. So the ACE before was annotated for entity linking, I think by Ratinov and Roth. And the
ACE'05 was annotated by Bentivogli in 2010 for entity linking. Yeah. Those are the new data sets.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:17">

I see. So I'm not a, so it's not surprising that you get state-of-the-art results on the Wikipedia
dataset, but not on the news and the ACE'05 because the news will definitely, the style used in the
news will be different than what you're learning, the embedding that you learning from. Is that
right?

</turn>


<turn speaker="Nitish Gupta" timestamp="17:37">

Sure. that is true. But I would, yeah, so again, I would want to make the point that the comparison
to state-of-the-art is not exactly fair because we don't even use the training data from these
datasets, we don't even fine tune on them. So I think, yeah, obviously we don't beat the state-of-
the-art, but we are very close without even using that. An experiment to show how it could hold is
actually in table two. So where those AIDA system was trained on CoNLL'03 and then tested on ACE'04
and its performance dropped quite significantly.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:18">

I see. Yeah. I mean, the promise of the paper is that we can learn this the, the entity linking
model parameters using the set up that described and then we should be able to use it for multiple
different domains. So that's really what we're interested in evaluating. Right. I agree. You don't
have, you haven't used the same amount of information that are available to the other, to the
competing systems. And really the question is how far are we, if we, if we use this approach, how
far are we going to be from the state-of-the-art results on these particular domains?

</turn>


<turn speaker="Nitish Gupta" timestamp="18:54">

Just by using Wikipedia data?

</turn>


<turn speaker="Waleed Ammar" timestamp="18:56">

Right. Well, I guess the other question is how do you extend this work so that you can basically Get
the best of both worlds?

</turn>


<turn speaker="Nitish Gupta" timestamp="19:05">

Sure, one thing that has intrigued me and I think I will work on it is kind of making this a semi-
supervised model. I think that's a very cool work to extend this to is where you can train it in an
unsupervised way. Just like say plot ordered on the domains you want to test on without needing
label data. I think that will close the gap quite significantly. Without having the required label
data. Then obviously if you certainly care about a certain domain, I think getting a few labeled
examples is probably not the wrong thing to do if you actually care about a certain domain.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:54">

Right. That makes a lot of sense.

</turn>


<turn speaker="Matt Gardner" timestamp="19:56">

So switching gears just a little bit, I want to push on this cold-start evaluation a little bit. So
you have a section where you evaluate and we talked about this briefly earlier in this conversation
where you get a new entity in your knowledge base and you need to make predictions on it. In like a
cold-start kind of setting and find dimensions for this entity. And I think you make a bit of a deal
that like with neural methods that train entity embeddings you're going to have a really hard time
with this because you won't have seen this entity so you won't have had an embedding for it and you
solve this problem by not representing entities as vectors directly, but as compositions of features
of those entities in order to get a vector for it. Does that make sense? Is that fair?

</turn>


<turn speaker="Nitish Gupta" timestamp="20:46">

Exactly, exactly. And there are other approaches that do that as well. So primarily in the relation
extraction field where they would express entities as a combination or a composition of the words in
it or their types, or some other features. We use features as results. Yeah,

</turn>


<turn speaker="Matt Gardner" timestamp="21:04">

Right. I just wonder if this is something of a manufactured problem for neural methods because like,
we've always been able to do this when you get a new entity, you featurize it and it's the features
that get input to your model. The model already has learned weights for these features. And so it
has never been a problem. It's only a problem because some naive neural methods just learn a single
vector for each entity that's not parameterized in any way other than a weight for each entity.
Right.

</turn>


<turn speaker="Nitish Gupta" timestamp="21:36">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="21:37">

So anyway, it's not a problem with you with your paper. It's just pointing out that we're coming
back to what we did, but like, I guess we're learning through your paper and other and other papers
that this is actually the right way, I think to encode things in neural nets instead of trying to
learn entities for learning vectors for things that really should be featureized.

</turn>


<turn speaker="Nitish Gupta" timestamp="22:00">

Probably, yes.

</turn>


<turn speaker="Matt Gardner" timestamp="22:00">

I don't know. like word embeddings are a counter example, right? So some things you really do want
to pre-train, I guess. I guess it's an interesting question, how much, how much you want to just
associate features with individual things in your model versus having them parameterized in some
other way. I don't know if that makes a lot of sense.

</turn>


<turn speaker="Nitish Gupta" timestamp="22:21">

Yeah. So if I understand that you're trying to ask what should be the atoms in your model for which
you need these six kinds of representations and what are the atoms you would want to parameterize

</turn>


<turn speaker="Matt Gardner" timestamp="22:33">

Yeah, that's that. That's a really good way of stating. Yes.

</turn>


<turn speaker="Nitish Gupta" timestamp="22:37">

So, okay. Yeah, so even if you look at just look at the entity linking literature, it started out
where models would, where there would be these distance based similarity based models where you
would parameterize the entity just based on features and there was never this problem of cold-start.
But I still think in an information extraction paradigm you might want to have different, like a
dense representation for an entity. I don't have concrete like experiments to show it. But I think
there is, it is this problem of kind of this memory or knowledge about this entity that you would
want to keep saving in a dense representation. Which I think is happening in this model.

</turn>


<turn speaker="Matt Gardner" timestamp="23:26">

Okay. Yeah, that's fair. Like if you have, if you have a lot of information about entities it make
sense to store it in some I don't know what the right word is, like non atomic way is probably a
good way of saying it. Just like for language modeling or other kinds of things, it makes a lot of
sense to have an atomic representation for the word the, but a parameterized representation for a
name or other kinds of things.

</turn>


<turn speaker="Nitish Gupta" timestamp="23:51">

Right.

</turn>


<turn speaker="Matt Gardner" timestamp="23:54">

Okay. Yeah, that's, that's a good response.

</turn>


<turn speaker="Nitish Gupta" timestamp="23:56">

Yeah, and in word embeddings I think you probably get saved because the vocabulary of the language
doesn't change so often, but the vocabulary of the entities is ever growing?

</turn>


<turn speaker="Waleed Ammar" timestamp="24:06">

All right. I think that's that's all that we wanted to talk about in this paper. Thank you very much
for joining us today Nitish.

</turn>


<turn speaker="Nitish Gupta" timestamp="24:14">

It was a pleasure talking to you.

</turn>


<turn speaker="Matt Gardner" timestamp="24:16">

Thank you.

</turn>
