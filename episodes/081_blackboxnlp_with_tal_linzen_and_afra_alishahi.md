---
title: "BlackboxNLP, with Tal Linzen and Afra Alishahi"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Tal Linzen","Afra Alishahi"]
number: "081"
tags: []
description: "Neural models recently resulted in large performance improvements in various NLP problems, but our understanding of what and how the models learn remains fairly limited. In this episode, Tal Linzen and Afra Alishahi talk to us about BlackboxNLP, an EMNLP’18 workshop dedicated to the analysis and interpretation of neural networks for NLP. In the workshop, computer scientists and cognitive scientists joined forces to probe and analyze neural NLP models. BlackboxNLP 2018 website: https://blackboxnlp.github.io/2018/ BlackboxNLP 2018 proceedings: https://aclanthology.info/events/ws-2018#W18-54 BlackboxNLP 2019 website: https://blackboxnlp.github.io/"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientist at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guests are Tal Linzen and Afra Alishahi who are cognitive scientists joining us
today talking about a workshop that they co-organized at EMNLP last year 2018 Tal is an assistant
professor at Johns Hopkins University and Afra is an associate professor at Tilburg University. Tal
and Afra, welcome.

</turn>


<turn speaker="Afra Alishahi" timestamp="00:32">

Thank you for having us.

</turn>


<turn speaker="Tal Linzen" timestamp="00:32">

Thanks for having us Matt.

</turn>


<turn speaker="Matt Gardner" timestamp="00:33">

Today we wanted to talk about this workshop because from my perception it was one of the most well
attended and most well liked workshops at ELMNP. I was at part of it and I liked it a lot. So we
wanted to hear what you had to say about what you thought of it. So can you tell us at a high level
like what was this workshop about?

</turn>


<turn speaker="Tal Linzen" timestamp="00:49">

The motivation for the workshop is that we have a new generation of models in NLP that are based on
neural networks. And those models seem to work pretty well in general, but we don't understand why
they work so well, how they work and what their limitations are. And that's a bit of a situation
that's new in comparison to previous generations of models where we understood a lot better how they
worked internally. So the goal of this workshop was to bring together people who are trying to
understand how these models work coming from different perspectives, including machine learning, and
a linguistics, psychology, and neuroscience and so on.

</turn>


<turn speaker="Matt Gardner" timestamp="01:33">

So what do you think the cognitive side, as I said at the beginning, both of you are cognitive
scientists. What's the cognitive science angle here? How does this fit into understanding neural
nets?

</turn>


<turn speaker="Afra Alishahi" timestamp="01:45">

Well, it seems that a lot of the current architectures are actually much more suitable for
simulating tasks that humans do well. So it could be really interesting to see what kind of
information or what kinds of linguistic knowledge are useful for these tasks. So what is it that
these models actually learn in order to perform the kinds of tasks that humans perform well. So I
think our personal interest in this topic are both on our side, me and Grzegorz Chrupała, and on
Tal's side was to understand whether the kinds of representations that these models form, which we
don't have direct access to. So it would be great if we can actually develop a set of techniques for
making these kinds of representations more explicit in order to be able to get a better
understanding of what kinds of representations are also more plausible for humans to rely on. We
thought that the cognitive science motivation behind this approach was a bit more pressing than the
practical motivation for opening the black box because as long as the model does what it's supposed
to do, many people are not necessarily concerned about how these models work, but actually the
reaction, the response that we received to the workshop kind of proved us wrong because we got
submissions and also attendance from a very wide range of audience.

</turn>


<turn speaker="Afra Alishahi" timestamp="03:09">

It seems that at least in theory, many, many people are interested in knowing how neural networks
work and what the internal structure looks like and what kind of representations they use, even if
they're not necessarily interested in how the human brain works.

</turn>


<turn speaker="Tal Linzen" timestamp="03:24">

I would also add that there are maybe a couple of things that cognitive science can help with. So I
think what Afra talked about was mostly why understanding how neural networks work is urgent for
cognitive science, but, which I totally agree with. But in the other direction, I think that
cognitive scientists, and if you think of linguistics as a part of cognitive science, which is a
very challenging transition to think of linguistics as part of cognitive sciences that we are, have
a lot of experience and care a lot about characterizing the task very well. So I think we have
experimental, paradigms that tell us exactly what people are able to do and what they're unable to
do, what the, the, the very detailed breakdown of errors that people make. And I think that all of
this deep understanding of the task, what it really means to understand the structure of a sentence
or to interpret a sentence is something that is very developed in cognitive science and maybe a
little bit less in NLP.

</turn>


<turn speaker="Tal Linzen" timestamp="04:28">

So that's something that I, I felt in the workshop that, the workshop really benefited from
cognitive scientists. And the, the other thing that's not so much cognitive science traditionally
construed but more cognitive neuroscience maybe is that the challenge of having a large number of
real numbers represent whatever you're trying to represent. Is the same challenge that cognitive
neuroscientists are faced with when they try to analyze FMRI data. So FRI data is just a bunch of
numbers and we need to make sense of them and connect them to what we think the representation in
the brain might be. So again, I think that that tradition can be applied to analyzing artificial
neural networks in the same way that we analyze neural networks in the brain.

</turn>


<turn speaker="Matt Gardner" timestamp="05:16">

Yeah. I guess to rephrase just a little bit using a phrase, I think I got from you Tal; cognitive
scientists have a lot of experience trying to probe something that is a black box that has language
capacity, which is a human, right? And so we can use those methods to try to also probe these other
black boxes that have apparently or may have some kind of language capacity.

</turn>


<turn speaker="Tal Linzen" timestamp="05:38">

Yeah. So that's a great way to put it.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:40">

Sorry, I haven't attended a workshop so I have a hard time like imagining what an example of of
those methods, could you give an example?

</turn>


<turn speaker="Afra Alishahi" timestamp="05:47">

So there were actually a few families of techniques that repeated themselves in terms of things that
we saw in the submissions and also in the "invited talks".I think the invited talks actually great
examples of different approaches to trying to tackle this problem. Don't you agree, Tal. So we had
formal methods for analyzing the internal representations of neural networks. We had the general
approach that now people can't really agree on how to call them. But there are various labels used
for them like diagnostic classifiers of probing techniques or artillery tasks, which basically takes
this internal representations and then feed some to some other downstream tasks. Many of them
progressively motivated sports. We also had submissions which proposed techniques for trying to
structure the mount of the internal dynamics of networks to what we know about human brain. For
example, just taking the brain imaging data and taking the word embeddings or sentence embeddings
extract from artificial neural networks and try to map these two structures that their
representations are projected on and see whether there are structures similarities in this project.
I think maybe Tal can talk a little bit more about that. All the formal linguistics and artificial
languages.

</turn>


<turn speaker="Tal Linzen" timestamp="07:04">

Yeah. So I, I think that, there are experiments that people did with a synthetic data that were
quite interesting in that that's something that maybe you don't see as much in a NLP but would be,
would be nice to see more because you can really, design a simple and controlled language to test
the hypothesis about the learning capabilities at a particular model. And we had a few, papers that
analyzed how RNNs can learn context free languages for example. So we have this theoretical
assumption, that language is fundamentally a context free language or some mild extension of that, a
formalism. So in principle if we want to model language and the way that we think in linguistics,
it's a model we need to be able to model as many levels of embedding for example, as an infinite
number of levels of embedding.

</turn>


<turn speaker="Tal Linzen" timestamp="07:55">

Right? So in natural language you don't have a lot of cases of that. So we go to a synthetic
language and see how well, you can learn in that case and I think you can derive theoretical results
that are maybe not immediately applicable to NLP but it's still quite interesting about the
limitations of RNNs in generalizing to more deeply embedded structures for sample than they see in
training. So that's on the side of synthetic data. You can control the training data very well and
see how the network generalizes outside of the training data. So to understand its inductive biases.
But I think that there, there are also interesting, experiments with real languages that were also
about, generalization. So you train, an RNN language model on English and English Corpus, and then
you see how it generalizes to constructions that indicate how well it learned various syntactic
rules.

</turn>


<turn speaker="Tal Linzen" timestamp="08:51">

So if it learned, filler gap dependency, we had the really talk about that or if it learns the
agreement dependencies between different elements of the sentence.

</turn>


<turn speaker="Matt Gardner" timestamp="09:02">

Can you give us a little more detail on like filler gap and, and these other tests. I think a lot of
our listeners probably don't have a strong linguistics background and could benefit from
understanding a bit more.

</turn>


<turn speaker="Tal Linzen" timestamp="09:13">

Yeah. So, when you ask a questions in English, there are certain things that you're not
grammatically allowed to ask questions about in a sentence. So let's say the original sentences, "I
ate pizza and cookies," then you're not allowed to by the rules of being in grammar and the English
grammar police will arrest you if you ask the question, "What did you eat pizza and?" To mean, what
is the thing that you ate in addition to pizza?

</turn>


<turn speaker="Tal Linzen" timestamp="09:46">

So that seems like a pretty arbitrary restriction. Why are not allowed to ask that question? "What
did you eat pizza and?" Because you cannot ask questions like, "What did you eat your pizza with?"
Very similar questions are fine, but that particular question isn't fine. It's a bit puzzling
because we don't have any explicit evidence that those questions are wrong like no one ever tells us
that. And if you train a language model on the corpus, it's not going to get explicit evidence that
that's an un- grammatical question. So it needs to infer the fact that it's not grammatical from
other aspects of the corpus and that which is what humans do as well. But that's, that's a
generalization task. You ask the model whether it can detect that something is a grammatical or
ungrammatical even though we didn't see it at all in training and humans have very clear judgments
about this kind of a sentence,

</turn>


<turn speaker="Matt Gardner" timestamp="10:39">

How do you actually ask the model that? Do you have like some training data to say grammatical or
not or use some threshold? Like what do you do?

</turn>


<turn speaker="Tal Linzen" timestamp="10:46">

So there is the transfer approach, which you just mentioned where you have some, when you fine tune
the model on some examples of grammatical and ungrammatical sentences. But I think that the more
interesting cases when you manage to set the task up as comparison between the probability of two
sentences and you show that the probability of the grammatical sentence is higher than the
probability of the ungrammatical one. So for example, in the case of subject verb agreement, you can
test whether after the words, the books on the table, the language model assigns a higher
probability to "are" then to "is" because books are plural. So that's, you don't need to train the
model to do any additional task. You just look at the probability distribution that it generates
over the vocabulary.

</turn>


<turn speaker="Matt Gardner" timestamp="11:36">

That doesn't really tell you anything about grammaticality. Right? Or does it, because you could
imagine the systems still might have some sense of grammaticality like it might give a say these are
probabilities, right? And it goes say 20% probability to "are" and 19% probability to "is" it still
basically thinks both of them are equally grammatical even though it ranks one of them higher. So
what do you, what do you make of that?

</turn>


<turn speaker="Tal Linzen" timestamp="11:59">

That is a very legitimate objection. I hope that the difference between these two verbs that are
equally, semantically plausible into context, the, the only possible difference between them is in
whether one is grammatical and the other one isn't. So it's possible that the network is not
learning a categorical distinction between grammatical and ungrammatical sentences. I would have to
say that we don't have very strong evidence that humans have a categorical distinction with
ungrammatical and ungrammatical sentences. That's a dirty secret in psycholinguistics. The fact that
it shows the difference between these two words that are matched for all of their other properties
indicates that it learned something about the grammar of English. It might not be a categorical
distinction, but that gradient distinction is grammatical.

</turn>


<turn speaker="Matt Gardner" timestamp="12:48">

Okay. Yeah. There, there've been a lot of papers recently, some of them at Blackbox NLP, some of
them at other places that look at these probing tasks to try to say like what kinds of phenomena do
our pre-trained language models like Bert or Elmo or whatever Cove do they capture grammar. And
that's been a really big trend recently and we've learned some interesting things from it. Afra,
were there any other high level trends that you saw at the workshop that you want to talk about?

</turn>


<turn speaker="Afra Alishahi" timestamp="13:17">

Yes, actually since you mentioned this does not fit classifiers. There were a bunch of papers that
tried to argue against them, which started a very interesting conversation. I personally found this
very helpful and very informative. So they were specifically, I can think of two papers, one by
Zhang and Bowman and the other one by Naomi Saphra and Adam Lopez. So these were actually both
extended abstracts as our workshop, but now the extended versions of those work are available on
Archiv. Both of them tried to show that there are limitations to what these agnostic classifiers can
show. And there was also some works before that. But because these two were presented at the
workshop and they're talking about this workshop, I'm mentioning them, the main idea is that so
specifically the work of, John Bowman shows that even if you use a randomly initialized LSTM and
then take their activations on the hidden layers and then try to train some classifier for example,
for the part of speech tags, you will get an off chance accuracy.

</turn>


<turn speaker="Afra Alishahi" timestamp="14:18">

So that means that probably it's just that this layer is, you know, hidden layers are still carrying
some of the information which is already included in the word embeddings and therefore, you know,
you don't really, you can't argue that the train, the models have to learn some particular type of
information in this particular parts of speech tag, because it showed up in the performance of most
classifiers. So you have to take these results with a grain of salt and it's, you know, going to
take work. In the work of, a Saphra and Lopez, they were suggesting some other techniques that look
at the correlations between the kind of representation that you get in say a language model that's
trained specifically for predicting the next common word and similarly structured architecture model
which learns to actually predict the next part of speech tags.

</turn>


<turn speaker="Afra Alishahi" timestamp="15:11">

And then if you project these, their internal representations of these two models and try to look at
the correlations between the two, maybe that's the more reliable key or signal than if you actually
take the internal representations and feed them as an input to classifier and train that classifier
for specifically probe a particular encoding of it, kind of linguistic information. So I think
that's a, I mean I think the jury's still out. It's not really clear formally what strengths and
weaknesses of each of these two approaches are. But I think this is something that we should go take
into account then because now using all sorts of diagnostic classifiers and not necessarily
classifiers. Also some predictions that you make based on the activation layers of a particular
model that's trained on a certain task. We all use them very liberally and maybe we shouldn't really
be know jumping to conclusions if we get some off performers in this problem task.

</turn>


<turn speaker="Matt Gardner" timestamp="16:10">

Yeah, that's really interesting. We had a project recently with a student who was trying to do some
additional probing kinds of stuff and after seeing some of this work and talking to folks at ACL and
EMNLP we decided we needed something better than just performance on the task because as you say, if
you imagine you have a whole lot of training data in the probing task, then your classifier could
just be learning something from random vectors from, from the training data itself. Right, and so
the way we approached this was we said let's look at random as a baseline and then like get some
upper bound and then look at improvement over random as evidenced that it's learning something.

</turn>


<turn speaker="Afra Alishahi" timestamp="16:55">

It is important to keep in mind that there is a lot already encoded in the word embeddings
independent of the tasks that the model is actually optimized on and this really easily gets
translated from one layer to another. So it's hard to pull apart these two from each other. This
also can cause problems in the other approach. So if you look at the correlations, it could be that
the, you know, parts of speech, tie their service, keeping a lot of lexical information, which might
not necessarily be relevant to the task that is optimized, but kind of lingering information causes
the correlations to blow out of proportion. So it's important to set up experiments properly and use
really informed baselines, not just, you know, the maximum.

</turn>


<turn speaker="Matt Gardner" timestamp="17:42">

Yeah.

</turn>


<turn speaker="Tal Linzen" timestamp="17:42">

So I think in this context, a paper that got the best paper award at the workshop was very
interesting. That's by Mario Giulianelli and other people. The issue that I think that they started
to address in that paper is when we, show that diagnostic classifier performs above chance. That
means that the information exists in the internal representation of the model, but it doesn't yet
show that the model is using that information in the next layer. So traditionally the idea of an
internal representation has to have two components. First you have to have the information and code
it, but then you also have to have a downstream consumer of that information that is able to use it.
And we don't necessarily know that just from showing that the diagnostic classifier performs above
chance. But what they did in their paper, which I thought was pretty interesting, was to try to back
propagate, information through that diagnostic classifier back to the original layer that you're
trying to diagnose. And then see if changing the original layer according to what the diagnostic
classifier tells you to do changes the behavior of the original model. Then you can be more
confident that the model is in fact using the information that the agnostic classifier is picking up
on. So I thought that that was a, a really nice approach.

</turn>


<turn speaker="Matt Gardner" timestamp="19:09">

Can you explain this a little more? So I have say a pre-trained language model and then I'm doing a
diagnostic classifier on say filler gap dependencies and then I'm fine tuning or back propping
through my language model itself. And then I'm saying if my model changes a lot that means there's
stuff there. Well, okay, I'm trying to understand the conclusion.

</turn>


<turn speaker="Tal Linzen" timestamp="19:32">

Yeah, so, so what the, the thing that you are doing is you're telling your diagnostic classifier
what the correct answer is and then you are trying to see how you would need to change the hidden
layer of the language model such that diagnostic classifier gets the correct answer from the hidden
state of the language model. Let's say that diagnostic classifiers, predicting that the current part
of speech is verb, but you know that it should be noun. So you're trying to understand what do you
need to change in the original state of the language model such that diagnostic classifier gets the
correct part of speech and then you see if changing the original hidden layer accordingly improves
the behavior of the language model.

</turn>


<turn speaker="Afra Alishahi" timestamp="20:18">

Basically proposing an intervention mechanism. So instead of trying to fiddle with your model, try
to use an external tool to see where you can intervene halfway through the training in order to get
the training back on track. Basically, this was one of the interesting answers to the question. So
what? This was the current theme that a lot of people have experienced, if you work on these kinds
analysis methods, you get usually good reviews of your paper. So what is it good for? I mean, okay,
so now we know that these kinds of information is probably representative. How can we use this kind
of information? And this particular paper was actually trying to suggest one way of using back this
middle information or what kind of information is included in the network. Bring get back into the
original task training and try to reset the activation layers on the right track and see what
they've actually been. It improves the performance of the original task.

</turn>


<turn speaker="Matt Gardner" timestamp="21:22">

Okay. I'm still trying to understand how this is, is this the same as like standard fine tuning on
some end tasks like what is different here?

</turn>


<turn speaker="Afra Alishahi" timestamp="21:32">

You have an original end task, right? You have the language modeling objective, right? But then you
have this side-branch that you have a classifier that feeds off your original model and you're
basically trying to use the output of is classifier as the intervening in the, adjustment of the
weights of your original language model in order to perform the better than the original.

</turn>


<turn speaker="Matt Gardner" timestamp="21:54">

To do better language modeling. So this is like multitask training.

</turn>


<turn speaker="Afra Alishahi" timestamp="21:58">

Yeah, it is. And idea this similar is just the setup is different, right? So you don't have these
two parallel tasks that you are actually optimizing at the same time you are focusing on one of
them, but you're using the second one as an occasional tuning techniques.

</turn>


<turn speaker="Matt Gardner" timestamp="22:14">

Okay.

</turn>


<turn speaker="Tal Linzen" timestamp="22:14">

For me the part that was exciting about the paper is not that it gives you a way to do multitask
learning by direct supervision of the internal representations as opposed to the some like soft max
layer say, but that it gives you evidence that the model is in fact using the information that the
diagnostic classifier is picking up on. So for me, the exciting part was more that it supports the
idea of diagnostic classifier as something that tells you something about how the model works rather
than as a practical tool. Though it could also be as a practical tool. But I think in that case it
is not so different from multitask learning.

</turn>


<turn speaker="Matt Gardner" timestamp="22:51">

And so you know that the model is using it because you get large gradients or what's the exact
mechanism here? How do you know that the model is using the information from the scaffolding task or
whatever you want to call it?

</turn>


<turn speaker="Afra Alishahi" timestamp="23:04">

Because if you actually try to improve the performance of the diagnostic classifier, but addressing
the internal wave of the language model, then the language model performance goes up too. So if you
try to strengthen the representation of parts of speech facts, in this case, for example, your
position of the next coming work becomes more accurate.

</turn>


<turn speaker="Matt Gardner" timestamp="23:27">

Okay. Yeah, that makes sense. So we've talked about a couple of interesting trends. Interestingly
contradictory, we should use probing tasks and probing tasks, have problems,

</turn>


<turn speaker="Afra Alishahi" timestamp="23:37">

complimentary.

</turn>


<turn speaker="Matt Gardner" timestamp="23:39">

Yeah. any other, are there any other trends or anything you would highlight from like all of the
papers in Blackbox, it's kind of hard to summarize. I think he had 40 something papers in the
workshop, but was there anything else that you would bring out as like an interesting trend from,
from what you saw?

</turn>


<turn speaker="Afra Alishahi" timestamp="23:56">

Yeah, quite a large number of papers were submitted on the idea that maybe we should just work on
the architectures themselves who make the dynamic of the model more interpretable. For example, if a
particular modeling architecture, which uses latent variables or some explicit representation of
structure or it is trained to, you know, learn some sorts of explainable outcome, some structured
outcome or some rule-based represent representations, then the model itself helps planning what it's
learned. So that was a very dominant trends. I was actually surprised at how many papers or you
know, abstracts off in that direction.

</turn>


<turn speaker="Matt Gardner" timestamp="24:39">

What are the mechanisms that people use to make these claims? Is it mostly attentions or is there
something else?

</turn>


<turn speaker="Afra Alishahi" timestamp="24:45">

Quite a few papers use attention mechanisms and then analyze them, but that wasn't very surprising
or, you know, novel, although the way some people dealt with this was new. but as I said, the
architectures have actually incorporated some latent variables. That's best example of this line of
work I would say. So papers are specifically try to learn, I don't know, tree structures or parts of
speech or some sort of latent variable of which you can later then analyze them, and try to make
sense of not all of them work or as in, you know, not all of them actually improve the flat
architectures, but they're much easier to explain and some of them actually do improve their
performance.

</turn>


<turn speaker="Matt Gardner" timestamp="25:28">

Interesting. Yeah. And I guess that makes learning a whole lot harder cause if you have a discreet
latent variable, you have problems with backpropagation but you might gain something very useful by,
by doing that.

</turn>


<turn speaker="Afra Alishahi" timestamp="25:40">

And also another line, that was relatively popular was to use some sort of, manipulation or
preprocessing of the input as an analysis tool. So what happens if we pre-process our input data in
a certain way and then feed it to the model and then see what happens, how it affects the
performance of the model, which I guess formal linguistics section also falls under this category to
some extent. But there are also, there were quite a few papers for which presented this customized
data sets from annotated sentences for particular types of phenomenon, which you can then use for
analyzing the strengths and weaknesses of your model and what is sensitive to and what is not.

</turn>


<turn speaker="Matt Gardner" timestamp="26:23">

Yeah. Great. So you're doing another iteration of Blackbox NLP this coming year. What conference is
it going to be associated with or co-located with?

</turn>


<turn speaker="Tal Linzen" timestamp="26:33">

With the ACL in Florence? Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="26:36">

So what do you think are the interesting open questions that you hope people will address this year?
Like we learned a bunch from last year. There's still things we need to figure out. What are you
hoping to see.

</turn>


<turn speaker="Tal Linzen" timestamp="26:48">

First I should say that me and Grzegorz are involved in organizing it. But most of the work, done by
Yonatan Belinkov and Dieuwke Hupkes who joined us this year. I think one thing that Yonatan
highlighted is we need to have better metrics and better tools to understand how successful we were
in explaining or interpreting what goes on in the network. And we are mostly at a stage where we get
interesting visualizations and, tantalizing, qualitative results. But we need, to have more of a
science of interpretation than we do now. So I think that that would be an important next frontier
in this, in this area.

</turn>


<turn speaker="Matt Gardner" timestamp="27:32">

And I guess, going back to what we said at the beginning, it's one that cognitive science might have
some interesting things to say about,

</turn>


<turn speaker="Tal Linzen" timestamp="27:39">

That is an interesting question. I, we'll need to think about it. I don't have a solution for this
issue off the, off the top of my head. But I think that if we solve this issue in a artificial
neural networks, it would be a very useful and, cognitive science as well. Especially given that
artificial neural networks are just the best models we have right now for a lot of things in
cognitive science, vision and to maybe a lesser extent in language as a percent in the beginning.
It's important for us to understand these models as much as it is for NLP folks. And maybe even
more.

</turn>


<turn speaker="Afra Alishahi" timestamp="28:14">

So let me just say something in addition to what you just said. I'm not going to be part of their
organization team for the next BlackboxNLP. But, it so happened that we had some sort of a local
meeting here in the Netherlands with a bunch of groups who are working on similar topics. And one
idea that came up that I thought was really interesting was to have some say in a venue like this
and like BlackboxNLP, maybe not this one, but the one after that because it's, you probably need
some preparation for this, but to have some, something similar to the shared tasks that other
workshops have, but in a kind of an opposite format. So let's say that you have a model, a language
model that has already been optimized and trained and then you release it and let people use their
own analysis techniques to actually tell us what this model has learned. So what kinds of, you know,
linguistic knowledge has been encoded in this model and then see to extent the image that different
kinds of approaches can take is consistent with each other. That might be a very interesting, you
know, discussion opening or you know, there's this framework for comparing the viewpoints of
different approaches and how reliable or how consistent they are to what extent these are, you know,
complimentary or actually contradictory, but I guess it needs to be fleshed out more and thought
about.

</turn>


<turn speaker="Matt Gardner" timestamp="29:39">

Yeah, that's a great point. I guess we're in a really interesting time in NLP these days where we
have these crazy huge models that no one really understands, I don't think has ever happened before.
And so it's, I guess, thank you for putting together this workshop. It's a very needed direction
right now. Are there any last thoughts or something you wanted to talk about that we missed before
we conclude?

</turn>


<turn speaker="Afra Alishahi" timestamp="30:03">

I can't think of anything actually.

</turn>


<turn speaker="Tal Linzen" timestamp="30:05">

Uh, no, I think that's all that I wanted to say. I would also say that it was a really fun workshop
to organize and, that I really enjoyed all of the 50 odd papers that were presented in the, in the
workshop. And I think that, well I think one of the questions that people ask and you mentioned in
your email is why I have the workshop as opposed to just submit all the papers to ACL. And I think
that especially when, with at ACL becoming so large with, you know, thousands of entities and it
just very difficult to have conversations about a shared topic. And I think that the workshop just
enabled those kinds of conversations in the poster sessions and also at the talks. That was a huge
advantage of having a smaller and more focused, venue.

</turn>


<turn speaker="Matt Gardner" timestamp="30:56">

Yeah. Great. Thanks. Thanks for coming on. This is a really interesting conversation.

</turn>


<turn speaker="Afra Alishahi" timestamp="31:00">

Thank you for having us.

</turn>


<turn speaker="Tal Linzen" timestamp="31:00">

Thanks.

</turn>
