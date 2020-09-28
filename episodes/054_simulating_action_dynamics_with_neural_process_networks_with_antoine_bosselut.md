---
title: "Simulating Action Dynamics with Neural Process Networks, with Antoine Bosselut"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["New Speaker","AntoineBosselut"]
number: "054"
tags: []
description: "ICLR 2018 paper, by Antoine Bosselut, Omer Levy, Ari Holtzman, Corin Ennis, Dieter Fox, and Yejin Choi. This is not your standard NLP task. This work tries to predict which entities change state over the course of a recipe (e.g., ingredients get combined into a batter, so entities merge, and then the batter gets baked, changing location, temperature, and \"cookedness\"). We talk to Antoine about the work, getting into details about how the data was collected, how the model works, and what some possible future directions are. https://www.semanticscholar.org/paper/Simulating-Action-Dynamics-with-Neural-Process-Bosselut-Levy/dc01c9401d1caab7f5e6d2f1280f5815f6919977"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F420291052&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Waleed Ammar" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="New Speaker" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Okay. Today our guest is Antoine Bosselut, who is a PhD student working with Yejin Choi at the
University of Washington. Today we're going to talk about a paper that recently got accepted to ICLR
2018 titled: Simulating Action Dynamics with Neural Process Networks Antoine, it's great to have you
on the podcast.

</turn>


<turn speaker="AntoineBosselut" timestamp="00:29">

Yeah, it's great to be here. Thank you so much for having me on.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:33">

So this is about simulating action dynamics. What is that? Is this like some physics thing? What are
you talking about here?

</turn>


<turn speaker="AntoineBosselut" timestamp="00:40">

Yeah, so when we say action dynamics, we're generally talking about the effects that are caused
explicitly or implicitly by actions. So if you think about an action such as baking something, you
know, some of the things you'd want to know about an entity that's been affected by this action or
that, it's temperature has increased in the short term. You know, and if you can think about a
concept such as cookedness that entity is now been cooked with an action like refrigerate, you'd
want to know that the location of the item is that's been refrigerated as now in the fridge. And we
also would want to know implicitly that it's temperature is now probably lowered. In general when we
say action dynamics, I'm talking about modeling the effects of actions that aren't explicitly stated
in texts.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:32">

So you mean like state change kinds of things?

</turn>


<turn speaker="AntoineBosselut" timestamp="01:35">

Yeah, in general state changes particularly those that you wouldn't necessarily be able to extract
with a typical information extraction system directly from text.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:46">

Okay.

</turn>


<turn speaker="New Speaker" timestamp="01:47">

And what assumptions do we need to make about the states? Do we need to enumerate all the states
that we care about from the beginning? What kind of assumptions do we need to make here?

</turn>


<turn speaker="AntoineBosselut" timestamp="01:56">

That's a good question. At the start, right now we are enumerating the states that we care about
ahead of time. When we started this work, we manually enumerated something like nine states, which
we then further compress down to six. We use those to annotate a set of verbs in some vocabulary
that we also manually compiled as the states of interest for those particular domain.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:22">

So where do you think this kind of process modeling or dynamic action dynamics is useful? Why should
anyone doing NLP care about this?

</turn>


<turn speaker="AntoineBosselut" timestamp="02:32">

So I think that the reason that we want to model these actions dynamics is really to be able to
encode a representations of state that aren't explicitly written in text. You know, I hate this
phrase, but as humans, you know, we're aware of the many comments on simplifications of the actions
that we see performed in texts. You know, we talk about baking, there's implication that something's
been cooked. When we talk about cutting, there is an implication that's something shape has been
separated into smaller parts. And these are obvious to us because our understanding is augmented by
our own experience, but it's just completely enigmatic to an AI agent that is learning from scratch.
And since no piece of text describes these effects, there's no clear path to learning it, but these
unstated effects might actually be the most important piece of information you'd want an AI agent to
be able to condition on.

</turn>


<turn speaker="AntoineBosselut" timestamp="03:34">

If you think about a recipe that involves chicken, the most important thing that needs to be done
just to get it cooked at some point you don't want to be serving raw chicken, but at no point in a
recipe is it likely going to explicitly say at this point the chicken is cooked. At no point is it
going to say in this step, make sure to use the cooked chicken. You know, an agent should be able to
make these common sense inferences based on seeing a proceeding steps such as bake the chicken or
fry the chicken. And what we really want to do is to be able to encode this phenomena in the
representations of the state of entities.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:08">

How do you capture this information? Like how do you know what the entities are? How do you know
what, I guess we talked briefly about what kind of states we have. How do you even model this at
all?

</turn>


<turn speaker="AntoineBosselut" timestamp="04:18">

We assume that there's both a vocabulary of actions and entities that's provided ahead of time with
the model. So as I think I mentioned before, we have something like 400 actions roughly and 3000
entities which we the actions were manually compiled from lists I found online. It turns out if you,
just Google actions you can do in the kitchen, it'll give you a list of verbs, not very complex. For
entities I looked at the list of ingredients that's provided with every recipe in the training set
and I would extract unique ingredients like orange juice and olive oil from them, and that yielded
roughly 3000 ingredients that get changed throughout the course of a recipe.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:04">

Would you get the same vocabularies if you just took all of the verbs in your input data and your
training data and all of the nouns in the training data?

</turn>


<turn speaker="AntoineBosselut" timestamp="05:13">

So verbs? Very likely. So, and we did, we did augment the initial list that we found with a couple
ones that kept appearing, but for some reason weren't there, but that we thought had a high enough
probability of appearing in the text that we should probably just add them and model them. As far as
the entities go, I guess this is more of a question of the approach as well. There's a lot of nouns
in the text that can refer to constructs of raw entities that can be made up of different run
entities. So if we think about the word broth, for example, broth can mean something different
depending on what the initial set of entities you use to make it up. And so we wanted to represent
these constructs or these compositions in terms of the entities that compose them as opposed to
being there own separate entity value.

</turn>


<turn speaker="New Speaker" timestamp="06:13">

So you consciously decided to exclude these from the vocabulary?

</turn>


<turn speaker="AntoineBosselut" timestamp="06:18">

Yes. it's not necessarily excluding them from the vocabulary so much that, we wanted to consider
entities to really be raw ingredients and to model compositions of raw ingredients as just that
rather than giving them their own, let's say, embedding or their own place in the vocabulary.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:35">

Interesting. Okay. So then given this input of some texts whose dynamics you want to model and some
set of actions and instead of entities, what are you trying to actually do? What are you trying to
predict?

</turn>


<turn speaker="AntoineBosselut" timestamp="06:50">

Right. so I think that the best way generally that I found to explain this is with an example. Let's
run through an example like cook the beef in the pan. That generally the one I use in most of my
presentations. As input the model just receives the sentence, cook the beef in the pan. First it's
going to attend to a set of actions embeddings and select the one that corresponds to the action
that it thinks is being performed in the step. So in the sentence "Cook the beef in the pan." It's
going to select an action embedding corresponding to the action, cook. I should probably mentioned
at this point that the action embeddings themselves are initialized ahead of time. So before we even
start training, we initialize a single embedding for each of the actions in those verb sets. The 400
that I mentioned earlier. And we also initialize an embedding for each of the 3000 entities that I
mentioned earlier.

</turn>


<turn speaker="AntoineBosselut" timestamp="07:49">

And when we start training on a single recipe when we look at a single recipe in a batch we're going
to take the embedding for each of the entities in the ingredient list and set those as the memory
cells for the NPN for that particular example. And so then the component of the action selector is
going to compute an attention over the 400 action embeddings and select whichever ones that things
are mentioned in the steps. So in cook the beef in the pan, it'll probably select the cook action.
It's also going with the entity selector is going to compute an attention over the set of entities.
So in the same sentence, "Cook the beef in the pan." There will have been a beef entity that was
initialized initially and it's going to choose the beef as that entity. So that's sort of the
simplest case of selecting entities. We have a couple of augmentations I'm going to describe in a
second, but for now, let's just assume that we've done this dual attention and we selected the cook
action embedding and the beef entity embeddings in the simplest case, then the model is going to
compute a bi-linear projection between these two embeddings which we consider to be the new state
embedding for the beef.

</turn>


<turn speaker="New Speaker" timestamp="09:00">

At what point do you make these choices at the end of a sentence or after each topic or after each
recipe

</turn>


<turn speaker="AntoineBosselut" timestamp="09:07">

At the end of a sentence. So we're working on extending it so that we can have a more adaptive way
of updating the entity states, possibly after phrases. But for now we started simple and did it
after each sentence. So once we do the bi-linear projection, we take the resulting embedding, which
we consider to sort of represent a "cooked beef" quote unquote predict the new end state from that
embedding. So we have the six state change types, temperature, cookedness, location, shape,
cleanliness, and composition. And from those we predict an end state across each of them or just a
no change answer. So for cooked the answer would be that there's been a change in cookedness and
possibly depending possibly that its temperature has also been increased. And finally it's going to
overwrite the starting embedding for beef in the memory with this new embedding to represent that
the only beef we now have access to is the one that's been cooked earlier.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:13">

So from an input output spec, then this model looks like input is text and a set of actions and
entities. And output is a set of state changes after every sentence for every entity.

</turn>


<turn speaker="AntoineBosselut" timestamp="10:26">

Yes, We also consider the entity selection to be an output because we use multiple intermediate
losses. Just sort of bias the model to select the right entities and those right actions along the
way. And what's important is that when we predict the states, whenever we make a mistake we back
propagates the gradients with respect to the loss of predicting the correct, end states back to the
action embeddings, we've made a mistake and hadn't predicted the beef was going to be cooked this
time. The next time the cook action would be more likely to predict the correct end state if it's
applied to a particular entity.

</turn>


<turn speaker="New Speaker" timestamp="11:03">

And what's the representation that is the accurate representation for the states. So let's say for
the cook or for the location, is it that I can predict some of the values or is it...

</turn>


<turn speaker="AntoineBosselut" timestamp="11:15">

Yeah, so we we ran a crowdsourcing experiment to have Turkers give us a set of possible end states
for the six different state change types. And then we manually pruned the list to the sets that we
used in the paper. So I think for temperature there's three different possible states, cold and room
temperature along with the no change option. Then for composition it's composed, not composed
cleanliness has three clean, dirty and dry. Crookedness is cooked and raw. A shape I think has
something like four or five. And then location is like 270. Location was the one where we actually
use the datasets and we mapped nouns in the dataset to work to certain WordNet categories that we
manually selected like container and vessel and surface. And we use those as containers. So we made
a vocabulary ahead of time. There's issues with that which I'm sure we'll get into later. But it
seemed to be the best approach to start since doing something more extended was sort of outside the
original scope of the work.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:27">

So can we talk about your choice of how to represent entities for a little bit?

</turn>


<turn speaker="AntoineBosselut" timestamp="12:33">

Absolutely.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:33">

That seems like a pretty core component of your model and a choice that could've gone a lot of
different ways. So why do you think it's better to represent these compositions as mixtures of a
simpler entities instead of its own entity in itself? Does this make sense? So earlier we talked, we
talked about broth and how you want it to represent broth as a composition of whatever was in the
broth instead of just introducing a new broth entity whenever you encountered it. What, why did you
make that decision? What are the trade offs here?

</turn>


<turn speaker="AntoineBosselut" timestamp="13:06">

So that's a really good question. I wouldn't say it's a better decision. In fact, ideally in a
perfect world you'd probably want to be able to introduce a new entity for the mixture that's, let's
say a combination of the previous ones, without relying on representing these new entities as just
all the ingredients that compose it having the same representation in the entity memory though. The
problem is that I didn't really have the labels to do this, to actually have this functionality in
the model and I felt that modeling composition of entities, that's just a, an attention over all the
entities in the composition that would allow us to learn these types of patterns from scratch using
some simple inductive biases on the network such as the coverage loss or or the recurrent attention.

</turn>


<turn speaker="AntoineBosselut" timestamp="14:00">

Just an augmentation that I should have described earlier. The idea really is that, the similarity
of the state embeddings between entities in the same composition would make it easier to select all
of them if even one of them was identified when computing the original attention over the entities.
In practice though, predicting composition entities is the weakest part of the model. You know,
unlike on predicting raw entities where we get something like 75% F1 in the intrinsic evaluation and
for predicting compositional entities, that's only something like 21% F1, which is better than the
baselines, but it's still really weak from an absolute standpoint.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:42">

How do you get labels, so you said that getting labels was hard if you wanted to introduce new
entities, how do you that you, we haven't talked about this yet, but in the paper you mentioned you
take that week, supervision, distance, supervision, kind of approach for you to do like a heuristic
labeling of what entities are in the text, right? So how do you get that at all for these
composition? Like if I see broth, how do I know what entities are in it for this labeling purpose?

</turn>


<turn speaker="AntoineBosselut" timestamp="15:09">

That's really the tough part, for an example like broth, I actually don't have any heuristic
labeling for those. For something like dough is the same thing. For something like sauce, it's the
same thing. What I do have a heuristic labeling for is let's say I combine all of the entities that
make up the broth in a step and then the next one I have the word broth and no supervision there. I
can make the assumption that because it's nothing new is being done in this step. I can just assume
that the same, I sort of make the assumption that it's because there's a different word that's
describing the composition made in the previous step or the arguments in the previous step is
alighted or it's using a co-reference. And so I can make the assumption that those are the same
entities that are affected in this step.

</turn>


<turn speaker="AntoineBosselut" timestamp="15:58">

So let's say I have the example, "Cook the beef in the pan." "Now flip it." In the second example. I
know that the it probably refers to the beef and I can use this same logic to say that if I see
broth in a sentence and in the proceeding sentence, I saw all the ingredients that compose it. Then
all of the ingredients that make up the broth are being mentioned there. And eventually with a
couple of these cases that should be able to learn that a broth is made up of those same
ingredients. But if the obvious, you know, failure case here is, what if it's not right in the next
sentence, what if it's five sentences down the line in that case it actually doesn't have the
capacity to learn that right now.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:40">

Interesting. But couldn't you use the same assumption to introduce new entities in exactly the same
places where you assume that broth is a composition?

</turn>


<turn speaker="AntoineBosselut" timestamp="16:49">

Can I use the same assumption to introduce a new entity?

</turn>


<turn speaker="Waleed Ammar" timestamp="16:54">

It would just be heuristic, it's fine you didn't do this, like you made a choice. That's, that's
fine. I'm not trying to criticize it. I'm just curious what the options are here because it seems
like you could use the same assumption that you just made to get a different labeling scheme that
lets you introduce new entities and not treat them this way.

</turn>


<turn speaker="AntoineBosselut" timestamp="17:10">

Yeah, we probably could have. I think that it may be. So I think that it's possible that it wouldn't
have learned the same patterns of what actually composes the broth at that step. We introduced a new
entity for it. Then I don't think it would learn the same pattern across the entire training set
that the broth is composed of those ingredients. And that was really the intuition behind how we
were going to try to be able to learn compositional entities that we'd be able to see these patterns
emerge across the same sets of varieties over time. But it's possible that it would have done the
same thing even if we did set up a new compositional entity. And one of the things we're actually
working on now is being able to model those in the way you described. While it seemed like a good
idea initially, there's some pretty big shortcomings to doing it that way. Specifically in terms of
evaluation as well as how accurate we are in predicting them.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:07">

Yeah. Interesting. Yeah, I was at EMNLP last year and saw a couple of posters right next to each
other by I think folks in your group. So Yejin was one of the presenters and I think Noah Smith was
the other Chris Dyer or some folks working on language models that incorporated notions of discrete
latent entities and introducing new entities as they were processing text, which just made me think
of could you apply those same ideas here? It's just interesting to think about what you could do
next.

</turn>


<turn speaker="AntoineBosselut" timestamp="18:39">

Yeah, no, that's definitely a similar work. I think it stems from sort of two different goals. I
think that in that work, it was a very well motivated increased capacity for the language model.
While in ours we really wanted this interpretable interface to sort of actually almost model a
symbolic process within a neural network. And so while their entity embeddings are, I think if I
remember well, the entities that they sometimes come up with aren't particularly informative. I
think ours generally have a bit more real-world applicability at all times. But both of them are
really good works.

</turn>


<turn speaker="New Speaker" timestamp="19:27">

So I'd like to clarify, so after doing all the, this test supervision. What does the label data look
like? You mentioned we need supervision for the entities, the actions and the states, so what does
this look like?

</turn>


<turn speaker="AntoineBosselut" timestamp="19:43">

Are you asking about like what does the particular label look like? What do the different loss
functions look like?

</turn>


<turn speaker="New Speaker" timestamp="19:49">

Is it a top level? Is there a state vector after each sentence that you used for training.

</turn>


<turn speaker="AntoineBosselut" timestamp="19:58">

What we do is that after each sentence, when we predict each action, we supervise the action
prediction with the action label that we've extracted, you know, using these weak heuristics. And we
do the same for the set of entities that we're predicting. These are all binary cross entropy losses
by the way, because we make it so that the model can predict multiple actions in a step and multiple
entities as well. So it's sort of predicting the full action, a vocabulary independent of one
another. And then we do some one normalization to make sure that the weighted sum of them is similar
to a softmax and doesn't explode in magnitude. And we do the same for the entities as well. And then
when it comes to predicting the end states we use a cross entropy loss for each of the discrete
classifiers for each of those state change types.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:54">

So those require human annotation, I suppose?

</turn>


<turn speaker="AntoineBosselut" timestamp="20:58">

So in the development and test sets, yes, we annotated roughly 1000 total recipes. I think actually
closer to 900 to be able to have very dense annotations of the process itself in the training set
it's all weak supervision, however, because it's incredibly expensive to actually get these
annotations. So we wanted to see how far we could go by just trying to capture these dynamics from
weak supervision, but still being able to evaluate on something very well annotated.

</turn>


<turn speaker="Waleed Ammar" timestamp="21:32">

So how did you do the weak supervision for the states?

</turn>


<turn speaker="AntoineBosselut" timestamp="21:35">

So for the states we we did some crowdsourceing where we mapped the actions. Two particular state
change types and end states, then we predict the supervision it just depends on what action was
selected in the first place.

</turn>


<turn speaker="Matt Gardner" timestamp="21:53">

How frequently is it that the action that you have from your weak supervision or even that's
annotated in the validation set is different from the lemme of the verb in the sentence?

</turn>


<turn speaker="AntoineBosselut" timestamp="22:05">

I don't have exact numbers about that, but there are cases where you have let's say while stirring
the broth add this, in which case you can have different constructions of the verb that are in the
sentence.

</turn>


<turn speaker="Matt Gardner" timestamp="22:23">

Right. But the lemma for stirring would still be stir. And so you would predict the stir action, is
that right?

</turn>


<turn speaker="AntoineBosselut" timestamp="22:29">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="22:30">

So do you have any idea of like just a ballpark, 10%, 1%. Like how frequently do you get a mismatch
between lemma and action? You're supposed to predict

</turn>


<turn speaker="AntoineBosselut" timestamp="22:40">

Well, in the training set because we get the weak supervision by looking at these lemmas never
practically.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:46">

Okay. And in the validation set or test set?

</turn>


<turn speaker="AntoineBosselut" timestamp="22:49">

In the validation sets, we, I don't have these exact numbers. My guess would be that it's around 10
to 15%. So when we, in the validation set, when we did an annotation with crowd sourcers for which
actions occurred I think that roughly 85% or so of the time the verb was correct. So it's not too
bad. Some of the ones that are generally bad are those related to colors. So if you have something
like "brown the beef" you'll eventually learn that brown should be a verb, or at least that's, you
know, what the heuristic supervision does when in fact,brown is used as a color very often. So it's
sort of tough to get those ones that are fairly ambiguous, but that's sort of a trade off and a
sacrifice we're willing to make in order to get the labels, the hope isn't necessarily to get these
perfectly labels that allow us to do you know, a perfect tracking of what's going on. The idea is to
be able to build better intermediate entity representations using these symbolically motivated
architecture. So that you might have representations that are easier to condition on for a
downstream tasks.

</turn>


<turn speaker="Matt Gardner" timestamp="24:13">

Interesting. And what about first selecting entities? How frequently do you get a mismatch between
the raw recipe? Like you have a vocabulary of raw ingredients. How often is there a mismatch between
the lemma that you get in the raw ingredient and the lemma that you see in texts?

</turn>


<turn speaker="AntoineBosselut" timestamp="24:32">

Very often.

</turn>


<turn speaker="Matt Gardner" timestamp="24:34">

What are some examples?

</turn>


<turn speaker="AntoineBosselut" timestamp="24:36">

For raw ingredients, less so. So generally if it says something like cut the beef, it's going to be
the beef selected as the entity there's no problem there, but if it's in sort of the compositional
entities that we described earlier. Like, you know, knead the dough. Unless there's a particular
instance where the dough was defined in just the previous step, it's not actually going to be
annotated in the training data. And so, you know, in those cases, actually it's the mismatches more
than almost 80%, I think.

</turn>


<turn speaker="Matt Gardner" timestamp="25:11">

Right, right. That makes a lot of sense. Okay. So how well does this actually work at predicting, I
guess your, the evaluation metrics you care most about are predicting the right entities and
predicting the state changes, right?

</turn>


<turn speaker="AntoineBosselut" timestamp="25:24">

Yeah, I mean, it does better than the baseline on both. It's still a lot weaker than I'd like,
mainly because we're just not currently very good at predicting these compositional entities. So
while we do a fairly good job at covering, let's say, like the first four or five steps of a recipe
in terms of tracking, once we get into some of the later cases, performance drops quite a bit. You
know, there's sort of this bias when you when you predict recipes that at the end because you're
predicting finish constructs, you should practically be predicting every single entity, practically.
You know, if you make a lasagna and the last step is serve the lasagna, you should predict all of
the ingredients that have gone into the lasagna at that point. So it's actually, it's sort of very
tough to do if you're not doing well on compositional entities.

</turn>


<turn speaker="AntoineBosselut" timestamp="26:13">

But we do fairly well at redicting raw ingredients with something like a 75% F1 or sorry, 75%
recall. It's very tough to actually predict F1 for different types of entities. And then overall F1
of predicting entities is something like 50, 55%. And then for state changes we do fairly well as
well. We used a macro F1 measure and we weigh that by how well we predicted the entities. I think we
get around 44.5 Or 44.4 or something like that, which isn't too bad. And once again better than both
of the baselines we have that are sort of the best right now just, you know, typical RNNs as well as
some more advanced memory models.

</turn>


<turn speaker="Matt Gardner" timestamp="26:58">

What are those advanced memory models that you compare it against?

</turn>


<turn speaker="AntoineBosselut" timestamp="27:01">

So we use the recurrent entity network, which was a sort of a leading baseline on the bAbI task and
the Children's Book tests for a single pass machine reading. We adapted it for the task cause it's
originally made for QA tasks. So we took away the question answering output module and and instead
put our state (change) and end state predictors on top and we retrained it end to end to be able to
do that.

</turn>


<turn speaker="Matt Gardner" timestamp="27:26">

What about these models that latent entity, like the co-reference model that we were talking about
before, like it's a language model that tries to predict the next word, given some notion of latent
entities,

</turn>


<turn speaker="AntoineBosselut" timestamp="27:39">

The EntityNLM, we didn't really compare it to that model. It would have been difficult to evaluate
it in the same way. And that if it failed to actually, you know, create the entity representation at
a particular step for something like a raw ingredient, then it would get them wrong the rest of the
way. Which would have been an unfair comparison on that way? Cause it just wouldn't be really
designed for the same task, so we didn't include it. Also the work was sort of, done in parallel.

</turn>


<turn speaker="Matt Gardner" timestamp="28:11">

Right.

</turn>


<turn speaker="AntoineBosselut" timestamp="28:11">

So I think by the time we submitted this, it wasn't even out yet, but possibly a good thing to add
for a future reference.

</turn>


<turn speaker="Matt Gardner" timestamp="28:21">

Yeah. A lot of my questions earlier we're thinking about this kind of model and wondering could just
a fancier language model, do what you're trying to do without all of the crazy symbolic manipulation
you're trying to do, especially one that has some kind of like notion of entities. I don't know,
it's just interesting to think about how much of your stuff do you actually need.

</turn>


<turn speaker="AntoineBosselut" timestamp="28:43">

So that's one of the things that we're working on in greater detail now, is actually looking at, you
know, all right, we came up with this architecture, it does better at tracking and you know, it does
better a generation later on which of these components are actually critical for that. So I, I don't
think that just a pure language model would do as well simply because it wouldn't actually, I think,
be able to capture some of these implicit state effects that actions induced as well. But if we had
that same supervision, well then I think it might look something like the recurrent entity network.
Though I'm sure that we could augment it in more ways, but I think that it might do worse at
generation. And that's one of the things that we're looking at right now. Ultimately, one of the
goals of this work is to really be able to have a cleaner memory right operation. When we're
actually processing text, so that the model builds those representations in ways in which it knows
it can, rather than, you know, just composing words a particular way.

</turn>


<turn speaker="AntoineBosselut" timestamp="29:43">

The goal behind that is that, you know, if you have these better representations internally to start
with maybe you can do better on question answering down the line or generation then you currently
do.

</turn>


<turn speaker="Matt Gardner" timestamp="29:54">

So you also had some generation results mentioned in your paper. Do you want to talk briefly about
what that was?

</turn>


<turn speaker="AntoineBosselut" timestamp="30:01">

Yeah, so the process of generation was fairly simple. I really didn't want the decoder and
generation to have very much expressability or expressivity because we really wanted to see how did
the state representations that we have formulated using the NPN compared to what you would get with
let's say an attentive model or just a simple encoder decoder. And so what we did is that given us a
proceeding set of steps in a recipe, let's say the three initial steps. You want to be able to
predict the fourth one. So the task that's actually be performed as recipe step generation. And so
what we do is that we take all the proceeding sentences in the recipe and we pass them through the
neural process network, one by one, updating the state of the entities after each sentence. And this
sort of gives us the memory after we've encoded all these sentences sort of gives us a snapshot of
the state of the recipe at that point in time when we want to see if we can use these entities
states as a signal to condition on when we're generating the next step in the recipe. So we take the
entity, state vectors from the memory and we use a GRU to encode them sequentially to get a vector
representation for them. And then we also use the different GRU to sequentially encode all of the
proceeding words in the recipe to yield a representation for the word context.

</turn>


<turn speaker="AntoineBosselut" timestamp="31:22">

And then we do an element wise multiplication of these two vectors and we use that vector to
initialize the decoder. And then we do typical word by word decoding for the words in the sentence
of the recipe.

</turn>


<turn speaker="Matt Gardner" timestamp="31:34">

Does it actually work to get reasonable recipes out?

</turn>


<turn speaker="AntoineBosselut" timestamp="31:38">

Yeah. Actually it's definitely reasonable. We have some of the same issues as the seq2seq models
sometimes where it'll just, you know, fall back to a very common expression. But generally it does
augment the seq2seq models in a, in a pretty clear way. Usually something that actually sort of
shows the power of using the current state of the entities in time. There's this example in the
paper that I really like, I think it's the first one where the reference is to melt the butter on
the skillets and the NPN predicts melting the butter and the skillet as well. While the seq2seq and
attentive seq2seq, sort of focus more on, you know, combining ingredients, which are sort of common
phrases or sort of greasing the pan. And you know, it sort of shows that if you have a butter entity
states available that shows it's unmelted the model knows that that's, that butter's probably going
to be melted in some way. And so it generates that in the next step. Something that's interesting
about that same example is that, you know, the most powerful baseline compared to the neural
checklist model. What it does is that it just tries to use up a lot of the ingredients in that step.
Cause it's trained to optimize for entity usage as opposed to a conditioning on the entity states,
which the NPM does.

</turn>


<turn speaker="Matt Gardner" timestamp="32:58">

I always find myself a little bit nervous when there are anecdotal examples in a table in the paper.
Cause yeah, it's nice that you found like a nice intuitive explanation. But really how generalizable
is that intuition? Like do you have like a quantitative evaluation of any of this intuition?

</turn>


<turn speaker="AntoineBosselut" timestamp="33:17">

Yes. So it's, I guess the closest thing to the quantitative evaluation for that intuition I could
give is sort of the last two columns in the table, table five which shows the numerical results. You
know, obviously the BLEU and ROUGE scores are, you know, there's a lot of issues with them. Though
we do better on them as well. But it's really this sort of verb and state change F1 that gets me in
Verb F1. What we did is that we looked for the action that was performed in the sentence we
generated. We look at how at the F1 score of how well that recovers the actual verb that's in the
reference sentence which we have annotated. And then we look, we do the same thing for state
changes. So we map both of those verbs to the state change they induce and we look at whether the F1
of predicting the correct state changes based off of the verb. And this I think is where the model
shows that it's superior is that it does better in both of these tasks, which granted are evaluation
metrics that we made up ourselves that show that our model at the very least is better at predicting
the action that occurs in the next step and the state change and that should be induced.

</turn>


<turn speaker="Matt Gardner" timestamp="34:27">

Interesting. Yeah, that's pretty cool.

</turn>


<turn speaker="AntoineBosselut" timestamp="34:29">

So I mean, yeah, I'm also fairly wary of, you know, any type of generation evaluation metric to be
honest. And especially those that are sort of made up by the authors which in this case is me. But I
think the fact that, you know, we do better on all four of these metrics and I've had the benefit of
looking at a bunch of examples too. I generally think that the NPN does better at generating the
next step then the baselines do, though once again, these aren't the best baselines possible, at
least not in terms of vanilla seq2seq and attentive seq2seq. So I think that a much stronger
generation model, which I'm sure will come around in the next couple of years could also be very
competitive.

</turn>


<turn speaker="Matt Gardner" timestamp="35:11">

Cool. Any last thoughts before we conclude? This was an interesting discussion.

</turn>


<turn speaker="AntoineBosselut" timestamp="35:16">

Yeah. I'm really excited about this type of work that tries to integrate common sense inferences
into neural network architectures. And you know, one of the things that we're working on right now
is just trying to extend it to other domains. So we're working on being able to do it in stories and
scientific processes. Now I'm generally excited about where the work goes. Hopefully we can get rid
of some of this weak supervision and do some more end to end training. But I think there's
definitely a lot of work to be done in this area, and I'm really excited to see where it takes us
next.

</turn>


<turn speaker="Matt Gardner" timestamp="35:51">

Yeah. Great. I agree. It's a really interesting area. Thanks for talking to us. It was nice.

</turn>


<turn speaker="AntoineBosselut" timestamp="35:57">

Yeah, absolutely. Thanks for having me on. And I hope to see you guys at ICLR, stop by the poster.

</turn>


<turn speaker="Waleed Ammar" timestamp="36:04">

Will do.

</turn>
