---
title: "Interpreting NLP Model Predictions, with Sameer Singh"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Sameer Singh"]
number: "117"
tags: []
description: "We interviewed Sameer Singh for this episode, and discussed an overview of recent work in interpreting NLP model predictions, particularly instance-level interpretations. We started out by talking about why it is important to interpret model outputs and why it is a hard problem. We then dove into the details of three kinds of interpretation techniques: attribution based methods, interpretation using influence functions, and generating explanations. Towards the end, we spent some time discussing how explanations of model behavior can be evaluated, and some limitations and potential concerns in evaluation methods. Sameer Singh is an Assistant Professor of Computer Science at the University of California, Irvine. Some of the techniques discussed in this episode have been implemented in the AllenNLP Interpret framework (details and demo here: https://allennlp.org/interpret)."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F874817863&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello, and welcome to the NLP highlights podcast, where we talk about interesting work in natural
language processing. The hosts are Matt Gardner and Predeep Dasigi from the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:11">

All right, today, our guest is Sameer Singh, who is an assistant professor at the University of
California. Irvine. It turns out I actually have an office from him down the hall, and I work with
Sameer a lot. It's good to have you on the program with us today Sameer.

</turn>


<turn speaker="Sameer Singh" timestamp="00:24">

Nice to be here. Thanks for inviting me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:26">

Sameer has done a lot of work over many years on interpretation methods for neural net models or
machine learning models in general, trying to figure out why models make the predictions that we do.
And so today we thought it would be interesting to have Sameer on talking to us about why this
problem is interesting and how people solve it. So I guess, Sameer, can you tell us, what do we mean
when we talk about interpretations in NLP or machine learning generally?

</turn>


<turn speaker="Sameer Singh" timestamp="00:56">

I think generally speaking interpretations of a model can mean a lot of different things. I think
people have been looking at trying to design models that provide interpretability trying to get a
global understanding of what the model is doing and things like that. But the stuff that I've be
most interested in is what, I guess some people are calling instance level interpretations, or
instance based predictions where what you're really interested in is why did a model make a specific
prediction? And that's been the focus of a lot of what we've been doing.

</turn>


<turn speaker="Matt Gardner" timestamp="01:29">

And why is this something that people should care about?

</turn>


<turn speaker="Sameer Singh" timestamp="01:32">

So, instant level predictions or interpretations in general, tend to be useful for many different
things. I think from when we started doing this work, we realized that these black box models or
machine learning models tend to make really accurate looking predictions. But in many cases, that's
just not enough as an evaluation metric. And I think the community really understands that now, and
it's ingrained into more recent PhD students, but when we started doing this stuff, it wasn't quite
as obvious. So initially we were thinking of it as a really good additional evaluation metric. Like
if I have the predictions, yes, that's a signal for how good the model is doing. But if I also know
why the model is making a prediction that could potentially, another way to evaluate the models. So
that was how we started doing it. Soon after a different use case came up where instead of
evaluation, we started thinking of it as debugging, where anytime a model made an error, we were
able to go in and see why it made that error.

</turn>


<turn speaker="Sameer Singh" timestamp="02:37">

And that helped us understand what were potentially problems either in the training data or the
model. And so on. I think a more general use case, a broader use case, which people are striving for
is just to get users from a user centric view, get more confident or more informed about how the
model is making it's decision. So this is useful for many different things, but you can imagine in
most key applications of machine learning, the user is still in the loop. And often they're looking
at the output of the model and trying to make the higher level decision based on those predictions.
So if they have more information about why the model is doing something, it would just lead to a
much better human computer collaboration. So there's been some work on that end also, not so much in
NLP, there are a few standouts, but I think from an ACI or even a user interface point of view,
interpretations can be pretty useful.

</turn>


<turn speaker="Matt Gardner" timestamp="03:36">

I guess a canonical example in the last thing that you talked about is like medical use cases. If
I'm making a prediction that a doctor is going to use, then you really want to be confident that the
model predicted something for the right reason.

</turn>


<turn speaker="Sameer Singh" timestamp="03:51">

Yes. That's a good application of it. Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="03:53">

And so then to summarize what you said, there are a few different ways, a few different motivations
for why you might care about these instance level predictions. Like maybe I'm users say in a medical
use case, like we just talked about, or if it's predicting something for the wrong reason. I think
you hinted at this though we didn't, you didn't say it explicitly, but if a model is predicting
something for the wrong reason, then even like from a machine learning academic, I'm looking at toy
problem kind of perspective. I probably won't generate the model probably won't generalize as well.
If it's caught on some, you might call spurious pattern in the input data and is making the right
prediction for the wrong reason.

</turn>


<turn speaker="Sameer Singh" timestamp="04:32">

Yeah. That's a good way to phrase it. I think we use accuracy as a proxy for generalization, and we
know that that's not quite enough and explanations or interpretations of predictions can give you a
little bit more insight. And yes, if there are spurious relations, accuracy might look good, but
explanations, good explanations would not. And that's one of the use cases.

</turn>


<turn speaker="Matt Gardner" timestamp="04:53">

Okay. So I hope we've convinced people that understanding why a model makes the predictions that it
makes is an interesting and important problem. Why is this hard? Why can't we just know apriori
what's going on inside the model?

</turn>


<turn speaker="Sameer Singh" timestamp="05:08">

Yeah. So this is a very interesting question because it has increasingly become harder and harder to
do these things. But I think at the very first step, even describing or defining what an explanation
is, is quite difficult, especially when you start thinking about, okay, what is the optimization
problem that one is trying to solve? I think in a sort of higher level, what the user needs is quite
important, but somewhat easy to define. So you can say things like, you know, what is important for
the model. That's very easy to say in English, but when you start thinking about, okay, what is the
equation that defines importance, then it gets a little bit tricky. So I think the biggest challenge
in interpretability is to define what interpretability is in itself. And I think one of the reasons
that makes it difficult is because since we talked about these different use cases, many different
use cases need different kinds of explanations. So when you come up with an explanation technique,
they may be more useful for evaluation than for increasing a user's trust in the model. Sometimes it
can be at odds because for evaluation, you want something that's very, very accurate for the model,
but from a probably user centric point of view, something that's too accurate may actually show more
of the problems that the model was done, then increase the users trust. So there are all these
tradeoffs in just defining the model.

</turn>


<turn speaker="Matt Gardner" timestamp="06:30">

And on that point, the most accurate description of what the model is doing is just the model
weights itself and all of the internal computations. And that clearly is incomprehensible to most
users. So yeah, like there's definitely this trade off.

</turn>


<turn speaker="Sameer Singh" timestamp="06:42">

Definitely. Yeah. I think the trade off is even more. There's a spectrum of even what the user knows
and what the user likes and a prediction is something that anybody can understand. Maybe you're not
really good with properties, but let's keep that aside. But you can imagine some people just want
like the English sentence version of the explanation. Some people like decision trees, some people
like a nice flow chart, some people like to read code. And when you have all these different, I
guess, modalities of what people like to consume, it's tricky to define what the good explanation my
be, and of course this might depend on the task itself. There is no reason to think that an
explanation for NLI, even if it's perfect, would be the same form of explanation would work for
something like reading comprehension or machine translation and so on.

</turn>


<turn speaker="Matt Gardner" timestamp="07:29">

Is this a problem that's like unique to modern, deep learning neural net kinds of methods? Or did we
have this problem back in the days when everything was a linear model, are those easier to interpret
or is there's something else missing?

</turn>


<turn speaker="Sameer Singh" timestamp="07:45">

I think there are a couple of different reasons why interpretability has sort of taken everybody's
attention recently. One of them is definitely what you bring up. I think linear models, at least by
having a proficient for each of your input features seem like they would be interpretable. And you
could probably build on top of that to have approximations that would give you other sort of things
that you need from a visualization or interpretability point of view. But I think the biggest sort
of push for interpretability has been when things have become nonlinear, where you must have seen in
your introductory neural network models, essentially what's happening is input is getting projected
through some nonlinear transformation. And then you have a linear bound being the space well in that
nonlinear projection, a lot of things might be happening. And that's what interpretability really
cares about, not just about the sort of final decision boundary.

</turn>


<turn speaker="Sameer Singh" timestamp="08:39">

So interpreting something like that becomes difficult, especially when you talk about universal
function on box simulators will, then they can get fairly complicated and the users so need to be
able to understand that. The other main reason interpretability has sort of gotten a lot of focus is
honestly, these systems have been getting really, really accurate and their use case in real world
applications is just increasing. And we as machine learning people, some people are excited by this,
but some people are a little bit like, wait, they're using machine learning for that application.
That seems a little bit dangerous. And so I think interpretability has been another way to sort of
think about bringing some more sanity to applying machine learnings to more applications. And I
think that's been another push for why explainability has been the center of focus.

</turn>


<turn speaker="Matt Gardner" timestamp="09:28">

Yeah. That's a really good point pushing, real quick going back to the linear models, you get the,
the, I guess you hear a lot that linear models are inherently just better. Like we want to linear
approximation because it's more interpretable or we want to like distill some complex model into a
linear version because then I can interpret everything. But is that really true? Because it feels
like even a linear model there, if you have overlapping features in any way, then you could get
correlations that are hard to interpret. What do you think about this?

</turn>


<turn speaker="Sameer Singh" timestamp="09:57">

Yeah, that is true. I think it sort of all depends on how many features are going into your linear
model. I think I would say linear models that get too many features when you're talking about
thousands of features and looking at coefficients of this, a lot of things get quite complicated. So
like you brought up the fact that yes, there may be overlapping features, feature correlations and
the logistical regression or whatever, but it's sort of spread out the weight over all of them. So
you, as a interpreter needs to understand what the data supervision is like, needs to understand
what the feature correlations might be in order to even understand what that explanation is. And
yes, that's one of the big problems. I think some of the other problems that I faced when, I tried
to interpret linear models back in the day was mostly the features themselves.

</turn>


<turn speaker="Sameer Singh" timestamp="10:47">

I think not all features are interpretable and it was very common practice to take a bunch of
features and take cross products and take out a bunch of features and then do all sort of
combinations. And when you have features that get more and more complex themselves, it's not clear
what it means when the coefficients sort of look at one of the cross products, but not the feature
itself. And scannables and interpretables overlapping stuff. Also, people sometimes define features
by turning a different model and taking its output and creating a feature. And sometimes that's what
neural networks do is they have this they have this information that is not linear. So even though
the model is a logical regression, if your features are not interpretable, it makes it very
difficult as well.

</turn>


<turn speaker="Matt Gardner" timestamp="11:34">

Yeah. Okay. So we've talked about like, why this is interesting. You mentioned it at the end, we
didn't hit on this quite enough at the beginning, but like for any kind of like social application
of machine learning, like this is huge, like there's potential to cause real harm with our models.
And so we really want to be sure using some kind of interpretation, maybe like hopefully we have
methods that can figure this out for like why the model is doing what it's doing and that it's not
doing things for the wrong reasons. And we've talked about why it's hard to get this. I think now's
a good time to talk about. Approaches that people have taken to solve this problem and actually
interpret these complex models.

</turn>


<turn speaker="Sameer Singh" timestamp="12:13">

One thing I do want to mention about the challenging aspects of this before we go to solutions and
some of this will become evident when you talk about solutions is to even think about what it looks
like for NLP versus for other tasks and machine learning, other domains and machine learning. And
one of the reasons we've been focusing a lot on text is because there are some properties of NLP
that really aren't properties of language that really make it difficult to do interpretability,
which is not sort of, they don't quite translate across all domains. So some of those things, the
basic thing is that we have discreet inputs as opposed to devalued inputs, but just what sort of you
can think of what's happening in computer vision, but apart from just the inputs being discreet
themselves, which makes it a comment or space, the tricky thing is that not all imports are valid,
right? So just because the input is discrete doesn't mean you can take any possible combination of
tokens and treat it as like a valid input. So that makes it very tricky to do interpretability
research. And finally, it's very difficult to come up with a notion of distance between inputs as
well. So you can't use Euclidean distance and do some at a very fundamental level. Some of the
mathematical tools that are common across machine learning just sort of fail when you apply it to
NLP making the solutions a lot more trickier.

</turn>


<turn speaker="Matt Gardner" timestamp="13:36">

Yeah. And when you talk about linear models, a lot of the explanation methods that we're going to
look at, give you some kind of waiting on the input text, and it's not at all clear that that's
really what you want. But again, I think we'll probably hit more on this a little bit later in the
discussion. So yeah, thanks for bringing that up, but now it seems like a good time to segue into
what are the methods that people use to approach interpretability.

</turn>


<turn speaker="Sameer Singh" timestamp="14:02">

Yeah, so I think there's been a lot of active research. I'm going to give sort of a high level
categorization, which may not be the best one, but we'll go with that. So the first one, I'm just
going to call feature attribution, which is a set of family of methods that look at the instance
that you are making a prediction on and just attribute importance to the input itself, right? So
either to tokens in the input or potentially phases and combinations and things like that, but
they're mostly focusing on what parts of this input are important for my prediction. So that's
called an attribution based ones. Another family of which is recently getting faction is called
training data influence methods, but you're not quite looking at the features of the input, but
instead you're trying to find instances from the training data that are most relevant for the
prediction that you made.

</turn>


<turn speaker="Sameer Singh" timestamp="14:54">

So what was most influential when this model was trained from the training data that would lead to
this prediction? And finally, I think this is a bigger category, which we may not go into the
detail, but I would call it like explanation generation, essentially, where you have a model that's
trained in some way to generate an explanation itself, which could be a future attribution, like
one, but it doesn't have to be, it could be natural language could be anything. The idea is you
train something or you try to create an interpretable model. So those are the three high level
categories.

</turn>


<turn speaker="Matt Gardner" timestamp="15:29">

Yeah. I think that's a nice categorization. Do you want to tell us about this feature attribution
method first?

</turn>


<turn speaker="Sameer Singh" timestamp="15:35">

Yeah, so feature attribution ones are probably the ones that everybody thinks often the think of
explanations. I think it's very easy to pose. What is the most important part of the input that is
useful for the prediction or used by the prediction for the model? And I think the problem itself is
slightly trickier to pose when you start thinking about how to do this mathematically. So one way to
pose it is to say, okay, if we change the input very, very slightly, what would be the effect on the
output? And that sort of gives us sort of one of the earliest methods of interpretability, which was
just to take the gradient of the output and use that gradient or look, I think the gradient of the
output with respect to the input and see which part of the input have the highest gradient and
mathematically what that means that if that input was changed slightly, the prediction would change
a lot.

</turn>


<turn speaker="Matt Gardner" timestamp="16:31">

Minor clarification point. You say gradient of the output, but it's a loss function that we compute
gradients on. Can you be a little bit more specific?

</turn>


<turn speaker="Sameer Singh" timestamp="16:39">

So people have tried a bunch of different variations including using the loss function that was used
in training, but you can also look at the output probability itself and look at the gradient. I
think there've been variations where people take gradients of different things or, yeah, there's a
huge line of research as to what the gradiant should be of. But the idea is some function of the
output is what you're doing the gradient over.

</turn>


<turn speaker="Matt Gardner" timestamp="17:03">

Okay. Yeah. The, thing that I'm most familiar with though, as you say, there are other options here
is that you take the model's prediction, you pretend that's a label, and then you compute the loss
that the model would have gotten with that as the label. And that's what you mean by computing the
gradient of the output, right?

</turn>


<turn speaker="Sameer Singh" timestamp="17:22">

Yes. That's a good way to, I think that's the most common interpretation of that, yes.

</turn>


<turn speaker="Matt Gardner" timestamp="17:27">

Okay, you were telling us about how these methods work.

</turn>


<turn speaker="Sameer Singh" timestamp="17:29">

Yeah. So the gradient based ones are pretty interesting. You know, if some part of the input is
clearly having an effect on the prediction, they're pretty good at that, but this is also taking the
gradient at a single input instance. And we know things like by doing adversarial attacks and stuff
like that, that the gradient of the local region around the prediction may not be quite as flat as
one imagined it would be. So it's very impossible that the gradient is quite noisy and sort of
behaves in ways that doesn't make for a good explanation is what I would say. And so there have been
a couple of variations of these I'll bring up only two. I think the easiest one to understand this
small grad, but instead of taking just the gradient of the prediction of the instance itself, you
actually sample around a little bit around the instances.

</turn>


<turn speaker="Sameer Singh" timestamp="18:19">

So for a little bit in a little bit, add some Epsilon noise to the embeddings and then look at the
prediction and then compute the gradient of that, and then average out the gradient with respect to
each doping and treat that as the interpretation. So that tends to give likely smoother gradients,
there has been some really interesting work or integrated gradients where instead of taking
gradients, just at the instance or in the neighborhood around the instance, they look at accumulated
gradients over a whole part through the space. So you say something like, I'm going to start with an
input, that's all zero embeddings, and then I'm going to slowly increase those embeddings. Till I
get to the original instance and in the process of going from zero to the original instance, what
was the gradient for each of the input, through this part. And it gives some nice properties of
explanations that are useful, but that's, that's sort of one way to integrate reagents into
explanation techniques.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="19:20">

So just a clarification question about the process you just described. So right. The small grad and
the gradient based models that you just described; they are dependent on the distribution of inputs,
right? And it sounds like that solution you get is heavily dependent on your sampling procedures as
well.

</turn>


<turn speaker="Sameer Singh" timestamp="19:38">

That's right. And in fact, like the way they're defined in some sense are sort of distribution
independent too. So with small grad, you just add some epsilon likes to the dopamine embeddings and
sort of envision and things like that. That sort of makes more sense. And it's not clear what if you
change an embedding slightly? Is it a different word? But sometimes it might be, sometimes it's not
often, it's not. With integrated gradient. Also there is this notion of taking a reference instance
to start with. So for images, it might be something like an all blank image, like a whole black
image that you tried to get in, but should it be black should be white even there it's a bit tricky.
And with a NLP we have sort of decided all single embeddings is the way to start, but it's not clear
if that's, that's the one, because if that has never been seen as input during training, it may not
be a very meaningful thing to be looking at for the model. So yeah, there are, these sort of
concerns, that definitely show up.

</turn>


<turn speaker="Matt Gardner" timestamp="20:38">

Yeah. I wonder if, using a mask token for current transformer models, if that makes more sense than
a zero token or an all zero vector.

</turn>


<turn speaker="Sameer Singh" timestamp="20:47">

Yeah. That's right, another one that might be a good one. I think an UNK token for cases where the
model has support for that would be another potentially useful thing to use.

</turn>


<turn speaker="Matt Gardner" timestamp="20:57">

Yeah, though an unknown word token is like, say you replace "the" or some closed class function word
with UNK, then like you totally changed the grammatic quality of the sentence.

</turn>


<turn speaker="Sameer Singh" timestamp="21:10">

Yes. That's true.

</turn>


<turn speaker="Matt Gardner" timestamp="21:11">

In a lot of cases. Yeah. And this a related point, you've talked about like sampling in input space,
but you actually did a little switcheroo there. You, talked about embeddings, but the actual input
space is this discreet language space. I think a lot of these methods were developed for vision
where you actually can change things in the actual input pixel space because those are not quite
real valued, but close enough that it makes sense. Whereas in text, it seems a lot more problematic.

</turn>


<turn speaker="Sameer Singh" timestamp="21:43">

Yes. So that's actually a good point. That brings me to the second family of techniques within the
attribution explanations, which are a little bit more validity for perturbation based if I can use
that word. I think line, which is something we did quite a while ago was one of the first versions
of this, where we literally took the input and put and using some perturbation function, which would
be domain specific. And by perturbation in many, many different times, we would see what the effect
on the output would be. And so it's important to know that the perturbation is at the input level,
we are dropping tokens for the most part and things like that. And then trying to see what the
effect on the output would be and create a linear model of this. Right? So for each, I guess, for
each of the inputs that was dropped, how often did it change the prediction?

</turn>


<turn speaker="Sameer Singh" timestamp="22:32">

I think there's an earlier version of this that's even simpler to understand which is just for
prediction difference, where you would only drop one token at a time, for example, and literally
look at what the difference in the output would be. And the drop token that causes the biggest
change in the output is the most important one. LIME sort of generalized as not to be, to take some
form of correlations into account, but in the end it creates a linear model. There's another
variation of this called SHapley values, which has been used for text, I guess increasingly more
recently where it uses similar notion as LIME for interpreting it, but in some sense, it tries all
possible, define over all possible perturbations input and trying to understand what the SHapley
contributions are for each of the input tokens. It's a little bit more aware of the fact that the
perturbation that you've made exists in this space of possible perturbation some of them can be
bigger changes. Some of them can be smaller changes and gives us some nice properties.

</turn>


<turn speaker="Matt Gardner" timestamp="23:35">

That seems very hard to define for text. Like how can we, can you even talk about the, the space of
perturbations? Isn't this exponential?

</turn>


<turn speaker="Sameer Singh" timestamp="23:46">

Yeah, so when you're making perturbations and trying to compute the SHapley values, it's taking into
account what tokens appear in each perturbation. Whereas LIME was somewhat agnostic of it. It just
looks at a bunch of tokens and assumes that they have a uniform contribution, whereas SHapley takes
it into account how many different subsets it has appeared.

</turn>


<turn speaker="Matt Gardner" timestamp="24:07">

So, I guess you're assuming then a particular kind of perturbation. And so like you can control that
set. Like if you allow like arbitrary word substitutions, then like it's the size of your vocab is
like the base of your exponential.

</turn>


<turn speaker="Sameer Singh" timestamp="24:20">

Yeah, so all of these perturbation techniques or most of them assume that you're just stopping
words. And if you're using more complicated perturbations, I think there will be difficult to be
defined.

</turn>


<turn speaker="Matt Gardner" timestamp="24:30">

Okay, Okay, and then there are other methods that are, what are their other perturbation methods,

</turn>


<turn speaker="Sameer Singh" timestamp="24:35">

So there have been some more perturbation techniques that are a little bit more focused on NLP. One
of the ones that we worked on was called Anchors, which also was applied to images, but I think NLP
was a good application for it, but it was trying to identify what were the sufficient conditions,
where conditions here are, you can think of them as tokens. So what are the sufficient tokens for
the instance for the prediction to remain the same? Right? So if I give you a sentence, can I pick
out a few tokens where as long as those tokens appear in the instance, and you substitute other
tokens by similar tokens from your vocabulary, your prediction would remain the same, with pretty
high confidence, that was one sort of technique. There was another one that came out based on
similar idea called input reduction where the idea was to find the minimum subset of the input that
gives the same prediction.

</turn>


<turn speaker="Sameer Singh" timestamp="25:31">

I think the main difference between Anchors and input production was that Anchors, considers other
substitutions to other tokens. Whereas input reduction is primary focused on finding the reduced
input. Like if your input was just a few tokens, which few tokens would it be so that you get the
same prediction. Yeah. So all of these attribution based techniques, including radiant and
perturbation we sort of, they all build upon variations of very similar ideas. So we implemented a
bunch of them in AllenNLP Interpret, which allows you to compare all of these next to each other.
And I think that's been pretty useful to understand what the differences are between them.

</turn>


<turn speaker="Matt Gardner" timestamp="26:11">

Yeah, that was a fun little project that I was involved in. I guess you described it once as, this
is what happens when you put Sameer and Matt in the same room, because you brought in all of this
experience on interpretability methods. And I brought in the library and like, how do we, how do we
make common APIs to make this easy to use across any model that you want. Yeah, that was, that was a
fun project. There's one thing I want to talk about on the perturbation methods still though, which
is, you mentioned this earlier, when you perturb texts, you don't necessarily get something that's
valid or grammatical. So like how, how can we even understand how, like how accurate or, valid the
method is if it's changing the text in a way that it produces ungrammatical text.

</turn>


<turn speaker="Sameer Singh" timestamp="26:54">

Yeah. That's, that's one of the key challenges. I think we are starting with a lot, but these
perturbation based techniques is firstly yes. In how we even define a perturbation function that
results in valid inputs. And secondly, even if you are able to come up with a perturbation technique
that results in balanced sentences say you're doing background translations or some kind of
phrasing. And some of people have been doing word substitutions, as long as the word embeddings are
similar to that. How do you communicate to the user, what perturbation function under which this,
explanation was generated? So explanation for the same instance using background's relation, it
might differ a lot from something that uses the different perturbation function. And so all of these
make it incredibly tricky. I think it ends up being an empirical question in some sense, we will get
to that towards the end of the talk as to what makes for a good explanation and what doesn't.

</turn>


<turn speaker="Sameer Singh" timestamp="27:48">

In practice It's possible that yes, the inputs might be invalid, but the model's behavior on them is
still useful to understand what's going on.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:57">

Yeah, I guess the challenge of talking about is related to my question about the definition being
dependent on the sampling procedure it's self, right? And in a sense, it sounds like these
explanations, why the model chose to do this specific thing for this input, as opposed to all these
other things that you could sample from around it There's some discriminative nature to these
explanations, correct?

</turn>


<turn speaker="Sameer Singh" timestamp="28:23">

Yes, that's a good way to put it. In fact, for Anchors, that's kind of what we did. We would give
them the explanation, but we would also give them examples of instances that we generated along the
way, in some sense, that show that okay, for these inputs, look, they're so different, but since
they shared the same tokens, that output is the same. And that's one way to communicate it. I
wouldn't say we've managed to successfully solve this problem. It is a little bit more daunting than
to be looking at all these perturbations and from a purely understanding the explanation point of
view, it adds more overhead. So it's unclear whether that's useful enough.

</turn>


<turn speaker="Matt Gardner" timestamp="29:00">

Yeah. And another way of thinking about this too, is that input reduction, for example, the paper
that introduced this used input reduction on SQuAD, the Stanford Question Answering Dataset, and
SNLI the Stanford Natural Language Inference dataset, and showed that with very small or very large
reductions in the input, the model's predictions stayed the same. And we can say that, yeah, the
inputs no longer valid English or whatever language you're starting with, but at the same time, if
the model still makes the same prediction, then this is highlighting something that is pathological
in our model because a person wouldn't be able to give this same input. And so like this, we think
our models perhaps are doing complex grammatical, like they need to actually understand that the
grammar of English, but at some level, at least when you force them to make simple predictions,
they're actually to see these methods seem to show that they're not actually leveraging much of the
grammar of English at all. They're focusing on small things that give away the answer.

</turn>


<turn speaker="Sameer Singh" timestamp="30:02">

Yeah, that's a good point. I think that with the used input one of the most interesting observations
was that not just the prediction stays the same because that, in some sense, is not surprising
because you're forcing the model to make a prediction it has to make one, but the fact that the
confidence actually goes up. So even when you remove things that humans would find very important
for answering the question and humans would get increasingly more confused when you remove all these
important tokens the model on the other hand, keeps getting more and more confident when we remove
these tokens that to us seem very important. And that can really indicates the pathological nature
of this stuff.

</turn>


<turn speaker="Matt Gardner" timestamp="30:40">

Great, yeah. Okay. I think we've covered pretty well. All this whole area of figuring out what parts
of my inputs led to a prediction that this whole class of interpretation methods, the second class
of methods that you brought up are what parts of my training data led to a particular prediction. Do
you wanna tell us about those?

</turn>


<turn speaker="Sameer Singh" timestamp="30:59">

Yeah, so this is some exciting work, I think, sort of reintroduced to the machine learning community
by Percy Liang at ICML, I think I would say 2017, which is called Influence Functions. And I think
the idea there is to, yeah. Think about how influential was each training data point for a specific
prediction. And I think it's a little bit more difficult for us machine learning people to
conceptualize because we seem to think like, Oh, even like that's what requires such a huge amount
of computation just to even compute how important each training point was for a specific prediction,
but it makes for a really useful explanation because you know exactly, okay. We predicted this to be
a positive review because it looks so similar to this other positive review that was in the training
data. I think this notion of example based explanation has been studied a lot in other machine
learning tasks, not so much in NLP, but yeah, it's been incredibly exciting to see a resurgence of
this.

</turn>


<turn speaker="Sameer Singh" timestamp="31:56">

There have been a few other approximations of this. Also there was a paper in NeurIPS , a few years
ago for Center Point Selection Model. That's also pretty useful. And increasingly the last couple of
years, we've seen more and more application of these ideas in NLP itself. There was, one of my
students did a graph completion sort of model understanding why graph competition models are making
certain predictions and in those models, the creating based ones aren't quite as useful the
attribution ones don't quite make sense, but influence functions were really key to figuring out,
okay, what other ideas in this graph we're responsible for the model to make a certain prediction.
More recently I think ACL had a paper by Byron Wallace's group that was looking at influence
function and embedding it against some of these attribution based techniques for a bunch of
applications. So excited about seeing influence based off .

</turn>


<turn speaker="Matt Gardner" timestamp="32:51">

When you described influence functions, it sounded a whole lot to me like just K nearest neighbors.
Like, can I just find the nearest neighbor of my input? And is that sufficient? Like how is, what's
different here?

</turn>


<turn speaker="Sameer Singh" timestamp="33:03">

I think that the main difference from just using nearest neighbor on the input is to try and
understand what the model thinks is the nearest neighbor, as opposed to just what your row
embeddings would give it. But also in some sense, you want to attribute a little bit more to the
training process itself, or look at the parameters inside the model and say things like if that
training point was not in the training data, how much would my parameters actually change. And that
becomes pretty key when you're, for example, one, let's say you have a wrong input in the training
data. Just one instance of it, it's possible that that one is instance is changing the prediction of
a lot of different inputs, just because it has a single word or a single token, right. And it's very
difficult to imagine nearest neighbors and things like that would catch on this specific single
token that's causing a bunch of predictions to change. So you can definitely imagine cases where
nearest neighbor just wouldn't work.

</turn>


<turn speaker="Matt Gardner" timestamp="34:06">

But if I did nearest neighbor on say like the final layer before I do a softmax over class
predictions or something, say sentiment analysis, like my final encoding layer before, what's
essentially a logistical regression on these learned features and I do. So I take that final feature
representation and I do nearest neighbors on that. Would it give me essentially the same importance
weights on training data as influence functions?

</turn>


<turn speaker="Sameer Singh" timestamp="34:33">

I think so, they represent a point of selected work sort of shows that, that you could imagine a
version that does quite similar, but I think there are still key differences where the final leg,
you might lose a lot of information about what makes a instance important. And that information
might be sort of isolating what was most influential. We know this from sort of BERT and things like
that, that a lot of things that happen in the initial layers, at least by our probs, don't really
show up in the final layers, but might be key for actually making a decision about why to predict
some things. And I actually talking about bird it's also really interesting to see what this
influence function stuff looks like with BERT and other pre-training language models in the picture
where I think the focus so far has been to say, okay, we are going to fine tune this. And let's just
look at what about the fine tuning training data was most influential, but I think an exciting
research problem is to understand what about, why did BERT do something and not think about just the
fine tuning training data and see what influence is between that,

</turn>


<turn speaker="Matt Gardner" timestamp="35:43">

Yeah. That seems really complicated to go, not just through the fine tuning data, but that like you
have two separate training steps with different loss functions that you have to find influence
through. That seems really hard and find. Yeah. we, we didn't talk very much about how exactly the
influence function works. Do you have talking about math is hard in a podcast, but can you give a
high level description of what's going on when you're competing influence functions?

</turn>


<turn speaker="Sameer Singh" timestamp="36:10">

Yeah. So I can sort of give a couple of sentence intuition for how influence function works, but
this is just one of the methods they sort of really in how they do. So what influence function does
is you have a specific that's called the test prediction in mind. And first thing you compute is
what would be the effect of changing any of the parameters of the model on the prediction itself,
right? So you can think of this as just the gradient in some sense, right? So if I were to change my
parometer, number 1723, how much will it affect the output? Once you have this information, you can
go back and see, okay, for every training point, in my training data, if I was to remove that
training instance, how much would the parameter 1723 change? And that's in some sense, another sort
of gradient style update. And this is an approximation of what we do would do if you were to train
through convergence, but this sort of taken together gives you a pretty good approximation to what
would happen now, especially the ICML paper shows that if you actually do the Oracle experiment of
leaving out these training data and pre-training the model, this ends up being really good
approximation to that.

</turn>


<turn speaker="Matt Gardner" timestamp="37:24">

And so basically we're talking about two gradient steps here. And so you're computing a hessian,

</turn>


<turn speaker="Sameer Singh" timestamp="37:30">

That's right.

</turn>


<turn speaker="Matt Gardner" timestamp="37:30">

Over your entire training data, which if you have a lot of training data, like say BERT pre-training
data, this could be a nightmare.

</turn>


<turn speaker="Sameer Singh" timestamp="37:37">

Yeah, exactly.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="37:39">

Actually it's worse than that. I mean you are talking about training data times the number of
parameters.

</turn>


<turn speaker="Sameer Singh" timestamp="37:46">

Yes. And this is all for a single instance sometimes. So sometimes if you're trying to do this for
the whole test set, right. So you want to find out again, what were the most influential training
data points over all my test set, or something like that or a given test set, then it becomes even
more slower. Yeah. There have been approximations that try to get around this and some of them be
about the model and some mixed figures.

</turn>


<turn speaker="Matt Gardner" timestamp="38:10">

Okay, cool. This sounds like an interesting direction. I get the feeling from what you've said, that
this is still pretty early in its application, especially in NLP, but a really interesting potential
Avenue for a bunch of interesting work.

</turn>


<turn speaker="Sameer Singh" timestamp="38:23">

Yes. I would agree with that.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="38:26">

Good, you talked about influence functions and burden based methods. Do, can you give me examples of
a specific problems where one of these is a better version of generating data?

</turn>


<turn speaker="Sameer Singh" timestamp="38:39">

Between influence function and gradient base. It's kind of difficult to see. I think the gradient
based ones are really good when you're are potentially really good when your instances themselves
are pretty long. So if you're, you know, your inputs have paragraphs and things like that. Influence
function will give you another paragraph and a question from the training data and that level of
information may not be as useful as just telling you, Hey, this is the sentence or the phrase, that
led to an answer. So in that sort of situations, I think the gradient based techniques would be more
useful. I imagined things like NLI and techniques where it's very difficult to figure out a single
word or a few words that are the most important. You sort of want to say the whole sentence captures
what's going on in that case, I imagine the influence function techniques would be a lot more
useful. Again, I would point to the ACL 2020 paper that sort of actually compares these two in a
certain way to see how good systems they are. And that might be one of the first steps on trying to
see how the interaction of these tools.

</turn>


<turn speaker="Matt Gardner" timestamp="39:46">

Good. So I think we've covered the first two classes of interpretation methods that you brought up.
So understanding what parts of my input led to a particular prediction and understanding what parts
of my training data led to a particular prediction. The last thing that you talked about you called
generating explanations. I think the way I might phrase this is instead of taking an existing model
as it is, and trying to understand what parts of an input or training data lead to a particular
prediction. This third class tries to say, let me bake in interpretability or explanation somehow
into my model. So I'm changing my model architecture somehow. Do you want to tell us about this?

</turn>


<turn speaker="Sameer Singh" timestamp="40:28">

That's a good way to put it? I think in some sense, it makes sense. We've been talking a lot about
the problems with explainability techniques and like how explanation's failed to capture one thing
or the other, these methods sort of start from the focus of maybe the explanations are as important
as the prediction itself and sometimes even more. And so if that's the case, why not just design
models around it. And I think there's been a lot of work in this area. I'm just going to mention a
few, but there are quite a few in this area. One of the more prominent ones recently that came up
was this ENLI dataset where they took an NLI dataset and sort of paired it with human explanation.
So sentences that some human code as to why a specific pair of sentences was labeled to be
contradiction or entailment and so on.

</turn>


<turn speaker="Sameer Singh" timestamp="41:20">

And so there have been a bunch of papers that sort of took this dataset and trained the model to try
and generate this explanation. So you get an analyze system at the end that not only tells you what
the label should, but also what, why the model thinks that label was reached. And again, the idea is
to generalize beyond just the instances that it was provided. I think this whole field has also been
called rationalizing, where the goal is, in some sense, even the goal of interpretable or
explanation is so much higher than the prediction. That you don't necessarily even care about what
the model is doing, but you want to generate an explanation at the end. So the idea of
rationalizing, as opposed to explaining is to say, we want to come up with some rationale for why
the model did something. And as long as it's useful, as long as users like it, that's a successful
rationalization, even if that's not exactly true to what the model would have. And so these are two
sort of works in this area. One last one that we did recently, again at ACL, there were a bunch of
papers that were looking into this was to sort of start looking at discrete explanations where your
module first tries to generate an explanation. And then based on that explanation tries to make a
prediction. Making explanation are really key component of the model itself.

</turn>


<turn speaker="Matt Gardner" timestamp="42:47">

Yeah. Thanks for the overview. I think we're running a little bit low on time, and this is a large
area that could maybe use its own entire episode of the podcast. Cause there's a lot that could be
covered here. So I think maybe we should leave that section as it is. And go on to my final area
that I want to talk about, which is how do you know if these explanation methods are actually any
good?

</turn>


<turn speaker="Sameer Singh" timestamp="43:13">

That's a really good question. And we don't. And honestly, the reason I like to read explanation
papers now is mostly to focus on how did they do the evaluation? How did they, what new thing did
they come up with to show that these explanations might be useful or might not be? And it's been
really interesting, especially recently in NLP where people have been looking at evaluating and
there, I think it is two or three, three papers at ACL, purely focused on evaluating explanations
and whether they're useful or not. So I think like we started, we talked about at the start of the
podcast, there are many different use cases of these explanations and each of them bring their own
set of evaluation techniques. And I can sort of talk about a few of them that are very easy to
understand, but just to know that it's a sort of ongoing field and it's probably going to continue
for a long time.

</turn>


<turn speaker="Sameer Singh" timestamp="44:06">

There is no standard metric for explanation. For me, I think the most useful metric is does anybody
find it useful? And so anything that involves user studies or recreation of a user study that shows
why the model, why these explanations are useful is a good evaluation technique. So I think the
easiest one to understand is when you do have gold explanations, this is most relevant when you're
generating explanations. But I think it can be used to evaluate attribution and LIME techniques as
well. Where you gather, you ask humans to give explanations or ask humans to judge explanations
purely on whether it reflects what they think the model should be doing or what a human itself would
do, depending on how you've gathered this dataset. So this things looks like for machine
translation. What would the alignment between the words be if you were to ask a human and then you
see if the explanation techniques are bringing up the same alignment or attention, it's bringing up
the same alignment.

</turn>


<turn speaker="Sameer Singh" timestamp="45:11">

For classification people are focused on what are the most important words and evaluating models
this way. And I think everybody understands that this is an evaluation. That's mostly focusing on
whether humans agree with what the model is doing or what the expressions are saying. And it doesn't
matter if what the model is doing is the same as explanation or not. And I guess this is going to be
the thing in most of the evaluations I bring up, these are all a bunch of what I call necessarily
properties from evaluations. Each by itself, you can always attack and say, Oh, this, evaluation
doesn't target that part of the explanation, but that is the hope is if you have enough necessarily
distinct necessarily evaluations, you're going towards something that actually shows that your
explanation technique is good.

</turn>


<turn speaker="Matt Gardner" timestamp="46:00">

Yeah. When you were talking about this, it made me worried. Like, it sounds very dangerous because
if the explanation you're talking about here is just highlighting words, then maybe it's not as
dangerous. But if you're, if you started with like generating an explanation, if my model like
outputs a sentence that says why it predicted something, and that thing is supposed to match what a
human would say, that actually doesn't constrain at all the model to actually be doing what it said.
Like you could imagine, for instance, some, again, I'm not recommending that anyone actually build
an NLP system that does this, but like some kind of like a lending decision that is like for a
mortgage application, something that you would hope doesn't use race at all. And the model might
output a description that says, I did not look at these particular sensitive attributes or whatever,
but internally the model just did whatever it wanted and it was like totally unfair and biased. And
so like, I don't understand how this is adequate at all. Like this, this has nothing to do with
explaining the model behavior, right?

</turn>


<turn speaker="Sameer Singh" timestamp="47:04">

Yes, that's right. And so, if you are interested in expanding the model behavior, then you have to
start thinking of evaluations that are focusing purely on that. Right? So there are a bunch of
evaluations that people have done where you don't even think about the user in the loop or anything
like that. What you try to do is figure out using some other techniques, things that are definitely
not important for the model or things that are definitely used for the model. So either by
controlling the training data a certain way, or looking at the test label and trying to do some
reasoning, you come up with these situations where there are cases that the model definitely should
not be using and cases where there are things that models should definitely be using. And then
trying to see how many times they show up or don't show up in the explanation and using them as an
evaluation.

</turn>


<turn speaker="Sameer Singh" timestamp="47:55">

That's one way to sort of, if you're able to set this up, one way you can evaluate it. I think there
are other variations of this where you try not to be, you don't try to construct this artificially,
but instead you start at the explanation side of things and then start removing things based on the
explanation and see how much the prediction changes. So if the explanation thinks that these two
tokens are most important for the model. If I remove them, their predictions could change a lot.
There are evaluation techniques that are based on all these ideas, these are all sort of automated
and give you some numbers. And again, there is the caveat that is something that looks good on them
doesn't necessarily mean it's a good evaluation explanation system. So you shouldn't be creating
explanation systems that are really good at these metrics because you want to make sure the other
ones that go with it as well.

</turn>


<turn speaker="Sameer Singh" timestamp="48:49">

I do want to bring up a few ones that we focused on that are a little bit more end-to-end. And this
goes back to why are these explanations needed? One of the ones that we started with was evaluating
models. So is a model good or not. Some of the explanations we've done is to say some of the
evaluations we've done is to take, say two models that are very different from each other, say on
the test set performance are significantly different from each other, and then show the explanations
for each of these two models for the same instance, doing user and ask them to say, which one do you
think makes more sense? Or which one do you think is doing the right thing? And at least the way we
set this up, this one was I think it's pretty promising way to evaluate these explanations because
it comes closest to how we expect they might get used. But of course it requires humans and things
like that and makes it complicated,

</turn>


<turn speaker="Matt Gardner" timestamp="49:41">

I guess, on, evaluating explanations at some level you could say, I don't need any external
evaluation. I'm computing a gradient of the loss like this mathematically tells me, right. What
parts of my input effected my prediction? What do you say to that?

</turn>


<turn speaker="Sameer Singh" timestamp="49:56">

I think that's somewhat I can just saying we can just print out all the parameters of the model
clearly that tells you what the model would be doing. So therefore that's a good explanation.
Obviously that example doesn't make sense to us because that print out will be a hundred pages long.
But the idea is that you need to be aware of the user. You need to be aware of what they're going to
be thinking about when they look at an explanation and how are they going to interpret it. And the
mathematical interpretation may not be the one that ends up being useful or ends up being how the
user interprets it when you give it to them.

</turn>


<turn speaker="Matt Gardner" timestamp="50:33">

Right. But I can, do these gradient based methods. I can back prop figure out which token if I
changed it actually would change my loss the most. And isn't that just by definition, the thing that
was important to the model?

</turn>


<turn speaker="Sameer Singh" timestamp="50:46">

I think the tricky thing is that what you're computing is if you change the token by an Epsilon,
that limits to zero is the accurate definition of the gradient, how useful that is for what you're
actually trying to do is unclear. And I would say not very much.

</turn>


<turn speaker="Matt Gardner" timestamp="51:04">

Yeah, also like again, where we talked about this earlier, but the way I just described this, I was
setting up a toy problem that I know was flawed, but you're looking at essentially a linear version
of what's going on here and looking at single tokens independently. And that's not actually how any
of this works. And so it's like not for a person, not for a model that has any kind of
contextualization or like any kind of notion of grammar. And so like, it's really not. You might,
you might think that, yeah, I'm just competing ingredients and looking at aggregated ingredients.
And so this should just work, but no, that's not how a person would understand what you're looking
at. And it's not even like you're summing in ways that throw away a lot of information when you
aggregate just on a token level.

</turn>


<turn speaker="Sameer Singh" timestamp="51:51">

Yes that's that's right. Yeah. And then that's one of the reasons why I think the influence space
direction might be useful because it sort of gets away a little bit from those kind of assumptions,
but of course ends up making a bunch of different conclusions, it's a different level of
computational models.

</turn>


<turn speaker="Matt Gardner" timestamp="52:06">

Yeah, there's even a worse problem, which is that you can fake the gradients. Right. Do you want to
tell us about this?

</turn>


<turn speaker="Sameer Singh" timestamp="52:13">

Yeah. So there has been some work in computer vision and some work that we've been doing, the I
won't elaborate to much on things, but yes, even the gradient on a very local level can be
controlled and manipulated in a way that allows someone. And this is sort of a pathological case,
but allows someone to manipulate what the gradient might look like. And in fact, this is not unique
to gradients. We've done some work in collaboration with [name] from Harvard that maybe showed that
even things like LIME and Shapley values can be manipulated by adversity. So if somebody wants to
make sure that the Reese never shows up in the explanation as the main decision making feature, but
the model is still using the race, you can create models that do so and are able to fool LIME and
SHapley values and other explanation techniques. So that sort of brings into question like an,
almost another evaluation of explanation techniques.

</turn>


<turn speaker="Sameer Singh" timestamp="53:13">

How many relatable are they? Are they robust with these kinds of classifiers? It's again, a good
discussion.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="53:24">

People who actually design models, innovative adversarial, do the explanation.

</turn>


<turn speaker="Sameer Singh" timestamp="53:29">

That is true.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="53:31">

And I guess a naive question here is why would people want to do that?

</turn>


<turn speaker="Sameer Singh" timestamp="53:35">

That's a good question. It all depends on why, how sort of critical these explanation techniques end
up being, right? So the goal is that if these explanation techniques are really, really good, they
will be deployed and available as often as predictions are. So if a bank wants to reject your loan,
instead of just saying, this is why the loan is rejected, this is apart from saying that your loan
was rejected, they might also want to explain why the loan was rejected and you expect them to be
accurate. So you would say well we trust LIME so you should use LIME to show me what the explanation
was. And the bank would very well be like, okay, fine. I'm just going to create this model that when
I run LIME on gives me a nice looking explanation, but actually the model might be doing something
else.

</turn>


<turn speaker="Matt Gardner" timestamp="54:21">

Yeah. There are governments that are considering, or maybe even have already imposed regulations on
when a model makes a prediction, you need to have some kind of explanation for it. And so then the
question is how does that explanation get generated? And if there's a government regulation that has
to be passed, there's an incentive to bypass the intent of the regulation. And so, yeah, you create
this problem where you need to be really careful, really careful with deploying any of these
explanation methods, if they are susceptible to these attacks. At the same time, that doesn't mean
that they're bad or that they don't work for cases that are not adversarial. There's been some
interesting work on this, that there was a series of papers that are interesting. Attention is Not
Explanation. And then Attention is Not, Not explanation.

</turn>


<turn speaker="Matt Gardner" timestamp="55:08">

The second one in here, it was like, well, I guess the first one was saying, Hey, look, I can spoof
stuff. And the second one was saying, well, yeah, if you spoof stuff, it breaks. But that doesn't
mean that a model that was not intentionally trying to spoof, I have now done too much negation and
they can't recover. But anyway, the point of this second paper is that models that are not
adversarial still have useful explanations, like they're interesting correlations, you can find with
the attention as a simple explanation with like actual phenomena in the data in interesting ways. So
like these explanation methods, no matter what they are, can still be useful, even if they can be
broken in, in adversarial cases.

</turn>


<turn speaker="Sameer Singh" timestamp="55:46">

Yeah. And this is sort of true of machine learning. It's like machine learning is useful, but there
are always caveats. And I guess I always try to give those caveats as well. And so even though we
worked on LIME and LIME is incredibly useful, I think it's, I hope it's useful, but I do also want
to make sure people understand the caveats that it's not some magic wand, but just to give you
exactly what's inside the model, that would be correct.

</turn>


<turn speaker="Matt Gardner" timestamp="56:12">

Okay. This, is great. This has been a long, interesting conversation, a little bit longer than we
normally do. We've covered a whole lot, but Sameer, as I always do, I want to give you the
opportunity to bring up anything that if there's anything you want to talk about that we missed or
any final thoughts before we conclude,

</turn>


<turn speaker="Sameer Singh" timestamp="56:27">

I think all I want to bring up is that I'm looking for PhD students and postdocs. If you're
interested in that, contact us. And of course, with Matt being down the hall, there's a bunch of
interesting research topics that we we're looking at. A lot of it looking at machine learning and
NLP from a pretty introspective perspective, Are we asking the right questions. How do we even know
we're doing a good job and things of that nature? So if any of those things interest you, I should
get in touch with me on that.

</turn>


<turn speaker="Matt Gardner" timestamp="56:54">

Great. Thanks. This has been fun.

</turn>
