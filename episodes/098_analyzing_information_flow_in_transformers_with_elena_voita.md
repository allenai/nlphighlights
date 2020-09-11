---
title: "Analyzing Information Flow in Transformers, with Elena Voita"
hosts: ["Pradeep Dasigi","Matt Gardner","Waleed Ammar"]
guests: ["Elena Voita"]
number: "098"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="00:11">

So today's guest is Lena Voita, who's a PhD student at the university of Amsterdam and a research
scientist at Yandex Research Welcome to the podcast, Lena.

</Turn>


<Turn speaker="Elena Voita" timestamp="00:20">

Hi. Thank you for inviting me. I'm very grateful to be here.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="00:22">

So the topic we're discussing today is analyzing the information flow in transformers, mostly in the
context of training machine translation models, today we are going to be talking about two papers,
both co-authored by Lena and others. The first one is called Analyzing Multi-Head Self-Attention:
Specialized Heads Do the Heavy Lifting, the Rest Can Be Pruned from ACL this year. And the second is
The Bottom-up Evolution of Representations in the Transformer: A Study with Machine Translation and
Language Modeling Objectives published at EMNLP this year. The first one was about stating the
relative importance of attention heads in self retention. So Lena, can you tell us a bit about what
was studied here?

</Turn>


<Turn speaker="Elena Voita" timestamp="01:01">

Yeah. So I would try to understand the functions of attention heads and multi-head attention
because, you know, it's introducing bias what was introduced in transformer and we do know that it's
leads to improvements in performance as measured with, for example, blue score for machine
translation and other metrics. But it's not clear what exactly is going on with these different
heads. Do they have some functions, are they all equally important and so on and so forth. So this
is basically, what we are trying to understand,

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="01:29">

So when you say head importance, what exactly do you mean by it? How do you measure the importance
of a given head?

</Turn>


<Turn speaker="Elena Voita" timestamp="01:35">

That's a good question. We can look at it from a different perspective and the paper does. But the
most, for a simple way to do it is to say that important heads are those which contribute more to
generated translations. Right? If you had some way of measuring how much each head completed with
translations we would say, okay, this head contributed more. That's why they are important. Finding
what can lead to a network prediction is not yet possible in NLP, but in computer vision there's a
whole line of works developing so-called attribution methods. These are the methods which try to
measure our contribution of pixels in an input image to prediction of a classifier, probably such
pictures, for example, a picture of a cat is classified as says for example the probability of a cat
to be on the pictures like four in seven. And this attribution matters finds this heat map which
show which pixels contributed to this prediction.

</Turn>


<Turn speaker="Elena Voita" timestamp="02:29">

And usually this heat maps quite interpretable. So what we do is we adapt one of the attribution
methods from computer vision, to measure contribution of neurons in transformer, but due to
differences in how we use it to compare the two attribution methods and computer vision. So first we
didn't know to propagate, to input and stop earlier some layer. And this way we valued contribution
of neurons in some layer and not imput elements. Second, we evaluate contribution on average for
where dataset, not for a single prediction because we want to find which heads important on average
and not for predicting some particular token in a sentence, right so we adapted one of our
attribution methods. It's called Layerwise Relevance Propagation and basically what it does, it's
propagated the prediction recursively from output layer to input layer and to evaluate its
contribution of heads or whether it contributions of neurons in multi-head attention to lower its
prediction by model for each generation step for development set and take an average and then we say
that importance of head or contribution of head is some contribution of its neurons.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="03:38">

I see. So did you see any interesting trends and the importance of heads and how they behave?

</Turn>


<Turn speaker="Elena Voita" timestamp="03:43">

Yes. First what was interesting was that we saw that in each layer there are only a couple of heads
which are much more important than all the others. It means that heads in multi-head attention are
not equally important for translation and they contribute to different extent. And this is a really
interesting because previous works looking at multi-head attention transformer. They use either
average overhead rates or a maximum. Therefore it is thought that heads are equally important but it
turns out in they are not.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="04:13">

Right. I see. There was also some notion of head confidence. I saw in the paper can you talk about
that a bit.

</Turn>


<Turn speaker="Elena Voita" timestamp="04:19">

Yeah, relevance is nice in a way but it's a little hard to feel of what's it is. So we also looked
at confidence of heads, which is the more intuitive characteristic. So we evaluate confidence by
picking maximum retention rate for each token and then take an average. Intuitively confident heads
are the ones that we tend to put all their attention masters in a single token and one might assume
that this heads are important because if they are confident probably they know what they're doing,
right?

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="04:50">

Right.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="04:50">

And you look at confidence and relevence and we see that at least the characteristics agree to some
extent. So in most of the layers, the most relevant heads are the most confident.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="05:00">

Was there anything interesting there to note about the cases where they didn't agree with each
other?

</Turn>


<Turn speaker="Elena Voita" timestamp="05:06">

Yes. It's a really good question. On all layers except the first, the most relevant heads are the
most confident ones. But on the first layer we don't actually see highly confident heads, both for
all models we looked at, there was one head which was much more important than other heads. And when
we looked at what the head was doing, we saw that it's attention head, which points to the least
frequent tokens in the sentence, which is not really something you would expect to see. Right. And
it was the same observation across different models. So the training, the machine translation models
on WMT dataset for English, Russian, English, German and English French. And for English Russian, we
also had additional experiments with this synthetic dataset. And for all models, the most important
head on first layer, which, what was this attention rare tokens.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="05:57">

Okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:57">

Do you mean the one that gets the most attribution. And when you say you rate words is just within
the sentence or

</Turn>


<Turn speaker="Elena Voita" timestamp="06:04">

So I have a sentence. Have for example, at least three tokens and almost all of the tokens in a
sentence point to this least frequent token.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:13">

Any insights. Why this would be the case?

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="06:15">

Yes. Actually I would come back to later when we discuss the second paper, because here at the
moment of the ACL paper it wasn't clear and we go through a little excited about it we tried to
understand why. Maybe it has some sort of story or something else. But in our, EMNLP paper, we
actually found out that it's some kind of modular application a little different kind of model
representation but Yes.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:46">

Okay. So you talked about the notions of importance and confidence and how sometimes they agree with
each other. Given, that you've defined these notions, what did you do about it? What was the next
obvious step in the paper?

</Turn>


<Turn speaker="Elena Voita" timestamp="06:59">

So we saw that only a few heads are more important than all the others. And initial question is, of
course, what are these head's doing? Then we will look at the attention method by paying attention
to these important heads and tried to categorize all of this heads and we find that the most
important heads that lean to positional heads, syntactic heads and attention to rare tokens. that is
most important head on the first place.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="07:25">

Given that you observed that some of these perform specific functions, you then went ahead and
looked at pruning the heads witch seemed not so important. Can you tell us a bit about that?

</Turn>


<Turn speaker="Elena Voita" timestamp="07:36">

Yeah. So when we saw that this important heads are specialized we were worried that maybe model does
not meet all the rest. Right? So we're have important heads, they perform some functions and it's
not clear whether are they important but it's hard to define their roles or are they just redundant
and the method for pruning heads heads. So basically what you want is to let the model decide which
heads it doesn't need,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:04">

So just to clarify, you mentioned the positional heads and syntactic heads and not necessarily clear
to the audience what this means. Could you clarify this a little?

</Turn>


<Turn speaker="Elena Voita" timestamp="08:13">

Yeah, of course. And so additional heads are the ones which point to the neighboring tokens for
example, there's a head which always point to the previous token, heads which always point to the
next token, and these heads are highly confident, the most confident heads in the model. So
basically they put all their attention, for example, here is the next token and syntactic heads are
the heads which are learned to track major syntactic correlations in a sentence such as a subject
verb over projects that are in that, in both directions.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:47">

So in the latter case it would be focusing most of the attention on two items. Is that right?

</Turn>


<Turn speaker="Elena Voita" timestamp="08:53">

So for each dependence relation, we look to weather a head points maximum attention to a token to
which it is say in one of the dependency relationships. For each region brings the relation or found
heads which might be triggering this relation

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:08">

And these observations they seem positional heads and syntactic heads and real words. These were
pervasive across the tasks you used for training.

</Turn>


<Turn speaker="Elena Voita" timestamp="09:18">

Yea, for all translation tasks we consider you have pictures in a paper when you're going to
actually see that here in our model. So the most important and highly continent heads are
positional. Each model has several syntactic heads for dependency such as type subjects/verb or
verb/objects. And for each of the model, the most important head on the first layer is attention to
rare tokens.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:41">

Thank you.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="09:42">

Okay. Coming back to pruning, can you describe to us about how you did this pruning?

</Turn>


<Turn speaker="Elena Voita" timestamp="09:49">

Yeah. So what we want is to switch the less important heads and to let the model decide which heads
it would it be? And so in the original model outputs of which head and modified attention are
calculated and then used in the model, you can modify this architecture by multiplying out what or
which head by a scalar gate and the gates are independent of input, scalar gate are as parameters
specific to heads. So ideally i would like to use a zero regulization on this scalar gate because a
zero number of times zero components and we would push the model to switch off, but since it's not
differentiable they couldn't incorporate directly in our categorization but with this categorization
we had to use stochastic relaxation. It means that we say, okay. Now each gate is a scalar value
drawn independently for each head, from a head specific distribution. And instead of minimizing the
zero, we will minimize probability of this gates being open, because we didn't distribution for each
head in a ways that this probability of heads being open is a differentiable respect to the
parameters. So it's real easy to minimize it using gradient descent and put directly this charm and
all of those functions.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:07">

So intuitively, why do we want to minimize the probability that it's open?

</Turn>


<Turn speaker="Elena Voita" timestamp="11:10">

So if you don't do this the model doesn't have to prune some heads, right? It wants to do nothing.
If it does say it explicitly model, we want to remove some heads for from you, it doesn't have to do
it.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:26">

How do you help the model learn which ones are more important? How do you actually formalize?

</Turn>


<Turn speaker="Elena Voita" timestamp="11:31">

So then using an objective is cross entropy loss, which is our main objective of the standard model
and this categorization term. And we can use different weights for organizations like we can push
more or less to switch this important heads. So on the one hand model still don't perform
translation task. And on the other hand it tries to switch off some hands. So in this way, it turns
off heads, which are important for translation.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:00">

Oh, I see. That's really cool.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="12:01">

Yeah, that's really interesting. And what were the empirical results that you noticed?

</Turn>


<Turn speaker="Elena Voita" timestamp="12:06">

Yeah, their are two sides of the story. One is about the BLEU score which I hate to say, but I'm not
to big fan of the BLEU score. So it turns out that that we can remove the vast majority of heads
with no loss of translation quality , almost no loss of of translation quality While when pruning
encoder heads we saw that for example, a model change on WMT, the model was only at 10 heads in an
encoder out of 48 was only 0.15 BLEU, which is not really much. And for example, another model
trained on open subtitle data set, it has only 4 heads in a quarter out of 48 and it loses only 0.25
BLEU which is realistically not much for performance. And when all heads with in the model, for
example, we can see that we can prove like half of the head where not lost at all quality or for
example, 75% of all heads was like .5 you know,

</Turn>


<Turn speaker="Elena Voita" timestamp="13:07">

But what did like a lot more about our methods than the BLEU score, my colleagues from the Yandex
translate would disagree about BLEU score, but what I like more is that now we can look at the
importance of each function from different perspective. Right now we say the heads which are alive
are important because the model chose to keep them and we'll look now at models with different
sparsity rate and look the functions of this alive head, surprisingly the results agree with data
propagation. So I have like two completely different ways of looking at it. So firstly we can say we
can evaluate attribution and the second part is completely different, like pruning turns out the
results are the same. So what we see is that just specialized head are the last to be pruned.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="13:54">

What function did you notice heads that actually survived the pruning process were performing?

</Turn>


<Turn speaker="Elena Voita" timestamp="13:59">

So we can prune like two thirds of all heads was all of specialized functions being alive. So
basically all functions are alive for until you have like seven heads. And then if you push forward
a head start taking several functions, for example, several syntactic functions. And if only a few
heads are alive, for example two heads a head start taking three functions, positional, rare token
and syntactic.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="14:26">

That's really interesting. Are there any other interesting patterns you notice from the results?

</Turn>


<Turn speaker="Elena Voita" timestamp="14:31">

Yeah, so we also looked at the importance of different types of attention in the model. Self
attention encoder, for attention in the decorder and decoder encoder attention. Right. And so when
pruning in all attention types in the model, we can look at which attention type the model wants to
prune more and to say, for example, that encoder self attention heads are the least important. These
are the first heads in model prunes the most important heads are decode encode attention, which is
obvious of course, because without decode-encode attention no translation can happen. And in orders
of decoders attention, which is can be thought of like language model on the target science, right.
It depends on the domain. For example, WMT dataset was long sentence, which are quite complicated.
They are almost as important as a decode encode attention what opens up title with short sentences.
They are almost the same importance as encoder self attention heads, which are not really important.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="15:36">

I see. Okay. So going forward, based on these results, what do you think we can change about the way
we build this models? Is there anything else you think we should do differently?

</Turn>


<Turn speaker="Elena Voita" timestamp="15:47">

I see several possible directions with research. First, I haven't mentioned it before, but I've also
looked at whether we can train from scratch model was the same categorization of heads as the pruned
model and we found that no we can not. This agrees with the results from model compression, which
also says that yes we can, it's better to prune much more than train from scratch then models of the
same size and they can be assigned connections to [inaudible] so we can look into that. And also
it's not clear or why the model is single kind of tension. You cannot learn this functions of course
in terms of quality and when you're training this multiple heads, it's a better. Another direction.
I see can be for example, I can see in that we know that these functions are important. I canwe
maybe, I don't know, do some kind of or a transformation of heads from different models. So we have
some function from one model and we take for example the confidence of different or in training for
example, we see that important has already performed some functions. We can initialize this,
important heads kind of like in pruning they also do that. So we have an important initialized and
be trained from scratch and maybe we can find more functions.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="17:08">

Yeah, that, that's really interesting. And then moving onto the second paper, which is about how the
token representations in transformers have evolved based on three training objectives. Can you
briefly describe to us what object of this study was and how you went about investigating it?

</Turn>


<Turn speaker="Elena Voita" timestamp="17:25">

Yes. So transfer domain is really popular now, right. And there are different kind of huge models
with different objectives and it's not clear. For example, we know that BERT on some tasks performs
better than say, ELMo right. But we don't know is whether it's due to train objective or
architecture, so why is that? Also we have a lot of results a lot of complicated results from
probing tasks which they weren't explained results of the kind. For example, if a tree untrained
LSTMs and use probing tasks to predict, for example, identities of neighboring tokens talking
identity untrained LSTMs preform better than trained ones. It's not clear why as it happens. For
example, probing for syntactic structure, it was shown that as you go from layer to layer
performance, for example, a representations from a T model increases after the highest layer. But
for language model it's a goes up to some layer and then comes down and it's not clear why this
happened so clearly different patterns different kind of behavior but it's not clear why.

</Turn>


<Turn speaker="Elena Voita" timestamp="18:38">

So in our work we tried to give like a general explanation of the process behind such behavior. So
we wanted to do fix everything which is possible. For example, we fix architecture we fix string
data and waited on the trained objective and instead of doing just probing tasks and measuring the
kinds of information modeler are trying to first give some general explanation of the process behind
such behavior and defined how obtaining objectives influence information flow. So this is basically
the main point of our work. So we looked at three tasks. First one is again machine translation
second is a standard language model or style retraining. And the third one Masked Langue Model,
which is most of the training objective of BERT. What we tried to do, so we want to give some
general explanation of what's going on.

</Turn>


<Turn speaker="Elena Voita" timestamp="19:36">

And our point of view in this work is information bottleneck. A method from 1990s which tried to
find a representation of input which contains as much as possible information about output. And it
operated with mutual information to minimize how much information while optimizing which information
was output. In terms of deep learning, in 2015 Tishby and Zaslavky in their work showed that a
computation in deep neural networks can be regarded as a evolution towards the optimum information
bottleneck objective, so imagine an network has information about input and it moves across layers.
And while it uses this information about input across layers, it discards information which is not
relevant off. So if think about it, it's quite obvious. So in a way output defines partition of
relevant and irrelevant information and therefore defines information flow. And since output was
different for each of our tasks, we expect to see different departments. And so the first thing to
do is survey. It is trade processes of information gained in representations like to train this
information but on that perspective.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="20:53">

So how did you manage information gain here?

</Turn>


<Turn speaker="Elena Voita" timestamp="20:56">

So let me first explained, what does information gained because instead of the information look in
extension, usually they considered in different layers and information can only get lost as you go
from layer to layer but, here as you can see representations of individual tokens, some information
can be gained from representations of other tokens how they interact., So first we measure and
mutual information between the representations and input token identity project or what was going
on. And what we see is that for machine translation task information about input is getting lost a
little bit, which is somewhat expected for language model it gets lost a lot more, which is again
expected because it tries to predict next token and the input token identity maybe not so important
on higher layers. And for MLM the behavior is a bit surprising. So first, similar to all the tasks,
information about input get lost but then on the upper layers it gets recovered and it happens like
in two stages, which we call it further context encoding and action stages.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="22:04">

You mentioned the diffence between MLM and masked language model , do you have any intuitions for
why there was a difference between the two of them.

</Turn>


<Turn speaker="Elena Voita" timestamp="22:14">

Yeah, of course. So for language model output is next token and so this output defines such
information, the model never makes. So it basically predicts the next token and talking about the
current token is not so important. Tries to build some, some kind of generalized implementation and
then predict the next token. But masked language Model is trained to predict current token identity.
And when training it's so most of the time Masked token or random token, And so it trains to first
like accumulate information about context and then we constructs the token identity. Also then maybe
we better discuss after we talk about. The second experiment which was mutual information where we
looked at not only on information was input, but information was input and output and these
experiments for masked language model would take representations.

</Turn>


<Turn speaker="Elena Voita" timestamp="23:08">

So like in training time, which weren't masked or replaced to get cases where input and output are
different. And what we see is actually is there are two processes going on, losing information about
input while at the same time I can relate to information about output and since output are different
so which model it means it's with loose information about current tokens and past and tries to
accumulate information about future and masked language model looses information about current
tokens, try and accumulate is contextual information and then it has to figure out a structure name
identity.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="23:43">

Okay, that makes sense.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="23:44">

So one thing that I that's not clear to me now is when you complete the mission of information to
the input and output, it is computed only with respect to that corresponding position in the
sentence.

</Turn>


<Turn speaker="Elena Voita" timestamp="23:54">

Yes. So we consider representations of individual tokens. So we take like a stack of representations
for each particular program.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="24:01">

So the, I think the one problem with this is that by design we want our transformers are designed so
that you can take the information from surrounding tokens while you're computing the next
representation or the next layer. Right. So just, just because the lower, the lower layer doesn't
have a good representation or like efficient information about the corresponding input doesn't mean
this input was lost. Maybe you start in surrounding.

</Turn>


<Turn speaker="Elena Voita" timestamp="24:27">

Yes, yes, yes, exactly. Exactly. Thats a really good comment. So in our, in our case situation is
way more complex than it said in the information bottleneck citation because in our case it's your
presentation plays kind of two roles. So it leaves a representation which is necessary to predict
output label, which is different for each task. And on the other hand it has to relay information
which is useful for looking at other representation of other tokens in the sentence, right? So yes,
the fact that in these current representations of current token, and lost some information about
token identify, it's not somewhere in the sentence and that's basically what we see in masked
language model. Right? So it loses information about current token identity but then it manages to
recreate it in upper layers because it can relate to information from, from other tokens in the
sentence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:22">

How about your second study you looked at measuring have influence flows across layers and you use
CCA to measure that. Can you say something about that?

</Turn>


<Turn speaker="Elena Voita" timestamp="25:31">

Tokens in a sentence interact with each other at each layer, right? And these interactions they can
be influencing others like even some kind of information and they can receive information and the
change themselves or we went to measure token inference and token change and for this we use or it
is by comparing different views on the same thing. So what we do is we take a lot of data and we
feed it to a network, gathered representations from some layer and see that altogether as these
representations for review of every layer on this data and they gather different views and use this
canonical correlation analysis to evaluate how different this views of the data, for example,
different views can be layers in different networks and in this way we want distance between
different tasks or we can say that different views are consecutive layers in the same network and in
this way we evaluate how much change is going on digitally.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:33">

I see. Okay. And what did you observe in your analysis?

</Turn>


<Turn speaker="Elena Voita" timestamp="26:37">

We had a lot of experiments. So in the first one we compared different tasks, and we found that
machine translation is closer to masked language model then each of them to language models,
standard language model, which is if you don't think of it as surprising because probably would
expect to see that the language models are closer to each other. Right. But when you think about it,
there actually are two reasons for why it can be happening. First is that standard language model
has access to a limited number of tokens in a sentence while machine translation and masked language
model have access to all the tokens in the sentence and the second language model focuses on other
tokens, or the next token right, it tries to make representations of the next token in the sentence,
but machine translation and masked language model. What was on the current token. Yeah.

</Turn>


<Turn speaker="Elena Voita" timestamp="27:31">

Then we look at how much processing is going on in each layer, do different networks and we find
that for machine translation if you go from layer to layer is going on. So yeah, so machine
translation is kind of refining representations, but it's not the case for language models and we
don't see this decrease in the amount of change. And also can explain this for example, for a
language model over [inaudible] information. So that integrated unit forgets a bystander, tries to
form a output label and this apparently requires a lot of change going on in each layer. And even
the high layers and for masked language model we again see these two stages, so first the amount of
change goes down, it's when prediction information has been gathered, like kind of refined and then
there they're going to construction stage. A lot of processes going on like a lot of change here on
the higher layers and like experiment tried to distinguish between different types of tokens for
looked at tokens depending on their frequency and evaluate change and influence of such tokens.

</Turn>


<Turn speaker="Elena Voita" timestamp="28:45">

And so, but I can change how much it consumes information, how much it changes itself and token
inference learning. How much would the representations of other tokens change if this particular
token is excluded currently and what we see is that in general breaking tokens change a lot, but
influence less and rare tokens change less and influence a lot. It's kind of intuitive right here
taking a token you don't have much information in yourself and you're trying to consume all the
information and then share it with others. But if rare token, you definitely have something to say
and you don't change much just like spread this information. And so and frequent tokens can be sort
of some kind of hubs for passing information through, so they help other tokens communicate with
each other.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="29:39">

I guess it's interesting that the end task here in your case is machine translation, which is why
it's very important to get all the content in the source to the target. It's be interesting to see
how these trends vary across different tasks in machine translation. But, but yeah, I think, I think
what you described is quite interesting.

</Turn>


<Turn speaker="Elena Voita" timestamp="29:56">

Yeah. And also for most language models we see the two stages from looking at changes this. So if
for MT in language model, the amount of change, like order to the frequency, but for most language
models a lot changes going on on the token construction stage. And I suggest you look at the paper.
So yeah, so again, we see the two stages MLM and there's also a nice connection to our first paper.
So here for machine translation, we see extreme influence of tokens on the first layer, it's like a
huge inference of tokesn in the first layer. But we don't see this, for example, for most language
models. Yes rare tokens influence more but not much more than the other tokens and the head and
additional experiment trying to train machine translation and language model with masking some
tokens at training time. And we observed is that if a model trained masked some tokens inference of
rare tokens is much less. It means that this information, it's not really important, but it's kind
of moderation and from the first paper we know that form. So how this annotation takes place in the
modle is by having this attention heads which is so nice to attend rare tokens. So the key is to
make general process like a huge influence of rare tokens. And from the first paper, we know like
the exact form, how it appears in the model because if it has a possibility to lecture or to have a
specific head for this,

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="31:27">

That's quite interesting. In your paper, you also looked at analyzing the representations by looking
at neighbors and how the representations of a given tokens inform their neighbors representation
says, well, can you describe what was what your observations were from that experiment?

</Turn>


<Turn speaker="Elena Voita" timestamp="31:43">

Yeah. So, in the last part we tried to look at which properties of representations most are defining
for representations in space. For example, are the ordered by token identity or are they ordered by
position in a sentence or are they ordered by some syntactical role in a sentence. What we needed
took a lot of representations of different tokens and looked at the closest neighbors in the
representation space. And what are the proportion of the closest neighbors which have for example,
the same token identity or the same position or the same CCG tag or the same left neighbor or right
neighbor. And the purpose of this was, again, to illustrate this general story. So in general, our
general story that your output defines information flow in the model. For example, language model
forgets past and far into the future.

</Turn>


<Turn speaker="Elena Voita" timestamp="32:44">

Again, what we see in this experiment. So again we are using different machinery but they observe
the same kind of process. Tor example, we're looking at token identity, we see that language model
forgets a lot of or current token identity and about left context, it's accumulate information about
life context and then graded against it. But on the same time if performance on prediction, right
token improves or a right part of the CCG tags. So we're looking to see the text, we divided them on
left part which respond to past information and right part which responded to information about
future. So and again what we see is that it can relay its context information about past and then
forgets it, and at the same time it tries to form this information about future.

</Turn>


<Turn speaker="Elena Voita" timestamp="33:33">

For masked language models, again happens in two stages. The context term quarter's dangerous. You
learn all this contextual information is being accumulated, but on the token construction stage it's
all goes down. After our submission we found a lot of papers about BERT and analyze and using
probing tasks and a structured probe, and different kinds of probings and they actually observe the
same behavior. So for example, using probing tasks or this was an ACL paper: BERT Rediscovers the
Classical NLP Pipeline. They had different probing tasks and when they saw that performance goes up
to some layer and this is what we call the context encoder stage and the thing goes down and using
different kinds of structural probings from Hewitt and Manning at NAACL 2019 they also observe the
same behavior and if you're trying to use BERT for some downstream task, for example, there's a
paper which is now submitted to ICLR 2020, it's tries to use a BERT to build a metric for semantic
similarity between sentences for preparation of generation tasks instead of BLEU score and that kind
of things and by looking at different layers.

</Turn>


<Turn speaker="Elena Voita" timestamp="34:44">

They also found a letter from and some of this metric and goes up as you go from layer to layer and
then it goes down again. So it's the same pattern on a dome using different tasks and different
machinery, different kinds of probing tasks and identification. But the general pattern is always
the same.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="35:03">

That is quite interesting. So do you think there are any interesting implications of these results
that will affect the future work in this direction?

</Turn>


<Turn speaker="Elena Voita" timestamp="35:09">

Yes. So most of all, if you understand how your objective defines the information flow in the model,
and maybe you could command objector for [inaudible], right? So obvious application next again, if
you understand how this general process, which is going on, you know when you look at probing
results or other papers or you trying to use a model for some downstream task, you understand for
example, that you may need different layers or different kinds of applications, right? Most
informative layers can do not just the top ones, but some where in the middle and you understands
its empty task.

</Turn>


<Turn speaker="Elena Voita" timestamp="35:46">

It's define it. So the performance is kind of [inaudible] but for language model is not monitored
right, again it is up and down. And also it would be really fun to connect this to stories. For
example, each model consists of like a model architecture and a training procedure. So here we
explained how train procedure defines information flow and also have some kind of understanding
which architectures, how different architectures encode information and if you put this all together
you have general process of information flow and we can for example, understand which form this
information probe will take place in different models. Examples for stuff. It can take like a
different attention heads for LSTMS or we saw that behavior is different, for example, can be an
Urus trait in some, some tokens in so and some other kind of stuff.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="36:35">

Thanks a lot for talking about these two papers with us, Lena. Is there anything else that you want
to talk about these papers that we missed?

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="36:42">

I would just like to mention most of this work was done with my research parents and went token
center and the first paper about heads was in collaboration with David Talbot, who is the research
head of Yandex translations. He was really excited about syntactic structure and one of my interns
and my self.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="37:01">

Thanks a lot for joining us for this episode.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="37:03">

Thank you for invitation it's been really great.

</Turn>
