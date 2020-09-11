---
title: "Contextual Explanation Network, with Maruan"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Maruan Al-Shedivat"]
number: 021
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:12">

Today our guest is my Maruan Al-Shedivat, Maruan is a PhD student in the machine learning department
at Carnegie Mellon University advised by Eric P. Xing. His research interests are in learning theory
information theory, representation learning, including various latent variable models. He is also
interested in applications in healthcare and natural language. It's a great pleasure to have you
with us today. Maruan

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="00:36">

Thank you. Waleed. It's a great for you to have me.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:41">

All right. So we're going to talk about the paper that you put on archive recently. The paper is
called: Contextual Explanation Networks. And the main motivation or professional explanation
networks is that low interpretability of standard neural network values, which makes it hard to use
them in mission critical problems. Could you describe an example problem where contextual
explanation network can help?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="01:10">

Right. So the original motivation was exactly as you said. That, we'd like to have models that are
powerful, but at the same time interpretable. And a motivating example would be, for example, a
healthcare application where a medical doctor uses a model but not to make like predictions in the
sense where, for example, we tried to categorize images into multiple categories and then that's
just the end product, but rather than to get, you know, a sense of the problem and then try to make
a decision based on whatever predictions that were obtained in the first place. So for example, so
we give this example in the paper it's a small motivation to consider you have the patients and then
you have different data for that patient. So you'd like to make a prediction whether a patient has
some sort of condition, for example, heart arrhythmia.

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="02:12">

And in this case you can have multiple variables that could contribute to the risk of having heart
arrhythmia. For example, diabetes, smoking, blood pressure and medical history, previous part
attacks. So whenever you ask a doctor, a doctor would tell you, for example you know, you have such
and such risk because such and such, you know variables are going to have certain values but you,
but the doctor takes into account, you know, or the context and probably knows the patient from
multiple visits. So we would like to build a model that would sort of, you know, would give you an
interpretable prediction such as a doctor's explanation, but at the same time the accurate enough to
match the actual risk.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:07">

Right. So the inputs here are going to be some text that represents what we know about this patient
and also a set of categorical attributes.

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="03:17">

Right, so the vision is that like, if we design a model of this class for healthcare, the input
would be text or it can be also images. And right now healthcare databases are growing and they're
becoming a pretty vast in terms of the types of data that you can collect about a patient. But also
you can have some sort of very specific crisp attributes that you'd like to interpret your decision
in terms of.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:44">

All right, so what exactly do you mean by an explanation here in this paper? And how can we
interpret this explanation?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="03:51">

Right? so in this paper we define an explanation as a probabilistic model, as a conditional
probabilistic model that conditions on the attributes and gives you a probability of a target or an
outcome. And in a sense, it's a pretty general definition because let's say you have a neural
network multi-layer neural net that takes in the attributes and then output your probability of a
target. And it's still satisfies the explanation definition. But probably it's not good enough for
us because we would like to have the explanation to be interpretable. So that's why we restrict the
class of these models to be, let's say linear or some simple class of models. But how we overcome
this problem of the restrictiveness of this class we say that the explanations are contextual. So
this probabilistic model is valid in a certain context. And this context can be specified by let's
say, a deep neural network or something else.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:56">

Do you think you lose anything by making this restricted class of models?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="05:02">

That's true. That's a great question. So of course you lose something. For example your targets,
let's say your, targets, let's say not just scalars, but some sort of vector output. And then there
is some sort of relationships between these outputs, right? If you try to predict this using a model
that completely factorizes over the dimensions of the targets then you will not be able to capture
any dependencies between these dimensions. So for example, you're trying to predict three different
conditions that are somehow interrelated or something like that. If your model completely factorizes
over these dimensions, you will not be able to capture some correlations between those.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:54">

So I'm missing a little bit of information here. How does making the explanation condition the
context make it interpretable? Rather, what do you mean by context for this composition?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="06:10">

Right. So for the context we we say that any data representation such as images or text or raw text
that is processed by whatever model that we're enough to learn from this from this data modality
will represent the context. So we take in, let's say it texts, we process it by an LSTM or maybe a
multi-layer recurrent bidirectional model. And then whatever the output vector would be, that would
be, that would represent a context for this particular instance. And once we condition on that we
say, well now we would like to construct a conditional model on this. That would have, would be from
the class of linear models from the class of linear models whose features are some specific
attributes such that we can relate weights to every single attribute. And then in this case, the
weight will have a very specific meaning.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:11">

I see.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:12">

So this sounds pretty similar to some work that was by Sameer Singh and some co-authors that I guess
was a post-hoc explanation. I guess that works says these models are really complex and it's really
hard to give some kind of intuitive explanation for what's going on. But for any particular
instance, I can find that some linear approximation to the classification decision that was made on
this particular data point by doing some fancy sampling and then show a linear approximation for the
decisions surface at that point. And so I'm pretty sure you mentioned this in the paper, but can
you, can you tell us, like what are the trade offs involved in doing this post-hoc thing versus
putting it in the model? Like what do you think?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="07:56">

Right, so initially we thought that it's a great idea to do this post-hoc interpretation. But the
problem is that when you construct a model post-hoc you don't actually use that model in the first
place to make a prediction. So it means that this post-hoc interpretation while it approximates the
decision boundary. In certain cases, if you have selected this representation in terms of which
you'd like to make you know, your linear interpretation to construct this decision boundary. So,
everything depends upon how you selected that. So basically if you select a very poor representation
but still interpretable you can get one interpretation and you tweak your representation and get a
little bit different interpretation. And this will not affect the performance, the model. So you
don't have a way to sort of judge in a very you know, principal manner, how well, you know, your
interpretation matches what actually the model is doing internally. In our case, we combine these
two paradigms together and then learn to interpret and to predict jointly. And as we show in the
experiments, in this case, if there's something wrong with the representation in terms of which
you're trying to interpret the model the performance will deteriorate while with the line framework.
It's not the case.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:34">

Interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:37">

So this is a lot of teasing for our audience. Could you explain to them what the context of
explanation is, what you actually do, how do they work?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="09:47">

Right, right. I probably should have started from first explaining how it works and then, go into
details. But so let's let's look at an example. So what happens? So consider a different application
or let's consider the same application. So we have some texts and then we apply to the context for a
medical note or just a paragraph an LSTM network. We pre-process it, we get a hidden vector. Now we
apply to this hidden vector a linear layer and then apply a softmax to get a probability
distribution so why we do that is because we store somewhere a dictionary of explanations. So a
dictionary of this linear models that we would like to apply to make the final prediction. And so
what we do, we use the softt attention mechanism to retrieve a model from this dictionary and then
work parameters of that model from the dictionary. And then we applied this model to the attributes
that we'd like to make prediction.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:02">

So, so does that mean that you have this dictionary of weights associated with linear your models
and you're actually doing a weighted sum over all of these givens, like some attention over each,
over all of the explanations in the dictionary? Is that, is that right?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="11:18">

That's, correct. That's correct. So in practice, what happens is that the dictionary becomes pretty
sparse, and also the attention vector becomes extremely sparse. So technically in practice what
happens is that we select one element from the dictionary all the time.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:34">

Okay.

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="11:35">

And even if the dictionary is sort of over parameterized we observe and practice that's a lot of
elements will just die out by themselves.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:42">

Do you enforce that sparsity particularly, or is it just?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="11:44">

That's right. We do enforce it. We opened an aligned organization on the entire dictionary.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:50">

Okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:51">

So, I think this refers to the constraint of the deterministic map is that what you're mentioning.
So, how does this compare to the deterministic encoding and the Mixture of Experts? Like two
different modeling this direction?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="12:05">

Right. So dictionary the sort of the constraint deterministic map where we use the dictionary is not
the only one. So the, the easiest one would be to amid this dictionary and try to predict parameters
of these explanations directly from the context. So that's the deterministic encoding where you just
take in the context and then you try to predict parameters of an explanation. So Mixture of Experts
is also a related model. So instead of trying to combine elements from the dictionary through
attention, what you do, you build every single model in the dictionary and then combine the
predictions together. So you're look at the predictions and then you say the final prediction is
going to be a weighted sum of the predictions of every single model and that the weights are going
to be the probabilities of these every single model in the dictionary according to the, according to
the context. So you out output this probability conditional on the context. And then wait with these
probabilities the models in the dictionary, in this case, we call them experts. So it's the
classical mixture of experts models. So maybe one, difference is that mixture of experts usually has
context. And in all these models, usually context and attributes are the same representation, but in
this case we would separate them into two different conditions.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:39">

I see. So the paper compares the explanations generated by the contextual explanation network and
the post-hoc explanations could you shed some light on the results of this comparison?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="13:54">

Right. So there are two results. So one of them is theoretical results and the, and the other one
that I've already mentioned is more like empirical results. So the theoretical results says that
under certain conditions if we're trying to interpret our contextual explanation network with a
post-hoc methods, or we're trying basically to locally approximate the decision boundary of our
contextual explanation network, we will recover the explanation that the network used in the first
place.

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="14:32">

So this means basically that the explanation's generated by the networks are consistent with the
post-hoc interpretations. In this particular case. So it also tells us that if post-hoc whatever
post-hoc method that you use or local boundary approximation method that we use so these
explanations, if they are interpretable, it means that the explanation is generated by contextual
explanation networks are also interpretable because they will basically match. So the other is also
empirical where we're trying to inject noise into the attributes in terms of which the explanations
are constructed. And the idea here is that so if you add noise to the attributes, you've sort of
decorrelate your targets and the attributes. So whatever your model conditional model that you're
trying to build, basically we're trying to predict from noise some outcome.

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="15:44">

And this in the worst case when that, when the noise level is pretty high this should lead to
basically random prediction. And that's what we observe with contextual information networks. So
their performance deteriorates. The more noise you add the, the worst performances. Because they
basically, regardless of which explanation you construct, you can do better than random. But then
we're trying to also, we tried to approximate decision boundaries of let's say a network, in this
case an LSTM or a convolutional network trained on the context on me. And then when we tried to
explain it in terms of these noisy attributes in post-hoc manner. So because we were trying to in
post-hoc manner, in post-hoc approximation, because we're fitting those local linear models to the
actual predictions, they still match locally the departments of the original model. But the
interpretations are providing in terms of pretty much noise. Does that make sense?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:00">

It does, yes.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:01">

So I have a high level question. What, I've seen a bunch of work, I guess people are really
interested these days and how to make these models interpretable. Do you think that showing like
linear feature weights is the ends like, is this good enough? Should we be looking for something
more? Like what do you think about the future of work on interpretability?

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="17:29">

I don't know, in my opinion. Both methods should be used sort of together. Because visualizing
feature weights allows you to somewhat debug the model that you trained on your data and just see
what are the internals, how it functions. It doesn't give you a specific, it doesn't give you an
explanation of why the model makes this or that prediction. So but it gives you, it gives you a lot
of other information that probably could be used for improving, you know training procedures. Of,
these models. So there's neural networks.

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="18:11">

In my opinion, like an explanation is by definition, like explanation, for example, I explained to
you a concept in math rights. I, tell you, I tell you a model that you can further take and then use
for other math exercises and it pretty much, you know, solving correctly. So I think an explanation
is by itself a model. And so it's a little bit different perspective than a neural network. So I'm
not sure how to combine these two together in in a sense that you can still use both, but I think a
way, an interesting way an interesting extension would be to try to combine where you sort of can
visualize, but at the same time, you can relate your visualizations to explanations in terms of some
sort of crisp features.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:01">

Interesting. Thanks.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:03">

Thank you very much for for spending the time to talk to us. And yeah, I hope to see you soon.

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="19:09">

All right. Thanks so much for having me.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:12">

Bye. Bye.

</Turn>


<Turn speaker="Maruan Al-Shedivat" timestamp="19:12">

Bye

</Turn>
