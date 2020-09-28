---
title: "Pathologies of Neural Models Make Interpretation Difficult, with Shi Feng"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Shi Feng"]
number: "087"
tags: []
description: "In this episode, Shi Feng joins us to discuss his recent work on identifying pathological behaviors of neural models for NLP tasks. Shi uses input word gradients to identify the least important word for a model's prediction, and iteratively removes that word until the model prediction changes. The reduced inputs tend to be significantly smaller than the original inputs, e.g., 2.3 words instead of 11.5 in the original in SQuAD, on average. We discuss possible interpretations of these results, and a proposed method for mitigating these pathologies. Shi Feng's homepage: http://users.umiacs.umd.edu/~shifeng/ Paper: https://www.semanticscholar.org/paper/Pathologies-of-Neural-Models-Make-Interpretation-Feng-Wallace/8e141b5cb01c88b315c9a94dc97e50738cc7370d Joint work with Eric Wallace, Alvin Grissom II, Mohit Iyyer, Pedro Rodriguez and Jordan Boyd-Graber"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing,

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This Matt Gardner and Waleed Ammar we are research scientists at the Alan Institute for artificial
intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Today our guest is that Shi Feng who is a PhD student at the University of Maryland working with
Jordan Boyd Graber. I met Shi when he came and gave a talk at UCI just a week and a half ago and
talked about some of his ongoing work, which I thought was really interesting. Shi, welcome to the
program.

</turn>


<turn speaker="Shi Feng" timestamp="00:28">

Thank you so much for having me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:29">

So today we'll talk about a paper that you published with collaborators at the University of
Maryland and a few other places, it looks like, titled Pathology of Neural Models Makes
Interpretation Difficult. So can we talk first about the setting of this work about interpreting
neural models? What have people done here?

</turn>


<turn speaker="Shi Feng" timestamp="00:48">

Yeah. So the kind of interpretation we're looking at here is a low code interpretation, which means
we are given a model prediction on a specific example and we want to understand why the model made
this prediction. And the form of interpretation is by highlighting the subset of the features. So in
the case of the image classification model, we might want to highlight some pixels. In the case of a
sentence classification task, we might want to highlight some words in a sentence. And for natural
language processing tasks, people have been using this pretty simple process called leave one out to
figure out which words are important and which are not. So this method is based on the confidence of
the model output. The process is basically you remove each word from the sentence and see how the
prediction changes. In the paper. We have this example of Tesla question. The question is "What did
Tesla spend Asters Money on?" And the original model confidence is 0.78 so what we do with the one
out is we take out the word what? So the question becomes "Did Tesla spend Aster's money on?" And we
give this question to the model again and observed that the confidence jobs to 0.67 so this job of
confidence from 0.78 to 0.67 defines the importance of this word. "What."

</turn>


<turn speaker="Matt Gardner" timestamp="02:17">

Can I jump in here? I guess I wonder about why this is a valid way to understand what's important.
There are some good reasons to think it is. I just want to dig into them. One problem you might
think with this is I'm changing what was a grammatical sentence or a grammatical question to
something that's no longer grammatical. Why is this a valid thing to do?

</turn>


<turn speaker="Shi Feng" timestamp="02:39">

I see. Yeah, I think the gramaticallity of the sentence is an interesting point, but I guess, let me
take a step back and go through the motivation of doing things like this.

</turn>


<turn speaker="Matt Gardner" timestamp="02:50">

Okay.

</turn>


<turn speaker="Shi Feng" timestamp="02:51">

So, so we're measuring the importance of each individual word independent of the context. So we
removed one word at a time. So this is making an assumption that the model is some kind of bag of
words. But the other way to look at this is it's making a linear approximation of model and this
approximation is local around this given example. So I think I really like the formulation from a
Lime paper. So the paper I'm referring to is "Why Should I Trust You? Explaining the Predictions of
Any Classifier" from 2016 so the name they call it is local interpretable model-agnostic
interpretations. I think we already explained what local means, where we're interested in a specific
example and model-agnostic means they want the method to be general enough so that it can apply to
any classifiers. So I think it makes intuitive sense that we want to perturb the input and see how
the classifier reacts to that.

</turn>


<turn speaker="Matt Gardner" timestamp="03:51">

Yeah, I guess I wonder perturbing the input means a funny thing in language because it's not obvious
how to perturb things in a meaningful way that doesn't totally break your input. Right? it's really
easy to make a perturbation that that gives me input that's no longer language. So why is this an
interesting and valid thing to do?

</turn>


<turn speaker="Shi Feng" timestamp="04:11">

Assuming that model is doing something reasonable about natural language, then when a sentence is
perturbed such that the new version is no longer grammatical the model should react correspondingly
in not making the original prediction. So we should observe, for example, some large job in
confidence.

</turn>


<turn speaker="Matt Gardner" timestamp="04:29">

Yeah. Yeah. I think that that makes a lot of sense. And I think later on in this discussion we'll
talk about some stuff you did to show that and make the model be more robust to this kind of bad
input. If you believe that the model is just doing a bag of words approach, then yeah, leaving
something out is a really good way to decide what parts of my input are important. Right? But if I
have this, this crazy nonlinear non independent kind of process that actually we hope uses the
context of the whole question, it gets a little bit more fuzzy to me that this is actually a valid
thing to do.

</turn>


<turn speaker="Shi Feng" timestamp="05:04">

Uh, yeah, I completely agree. So I guess one thing that we probably should address about
interpretation is they are all approximations of the model. So, all of the approximations would have
a perfect fidelity. So in the Lime paper they call this a fatality interpretability trade off,
right? So if the model is inherently interpritable we don't need a second model to explain this
original one. Yeah, so I totally agree. This assumption will break on some examples and the kind of
high level idea of this paper is to find extreme cases where this own faithfulness can be observed.

</turn>


<turn speaker="Matt Gardner" timestamp="05:44">

Okay. So I think we have a handle on the limitations and possibly usefulness of this, leave one out
method for trying to understand what parts of your input are most informative for making a
particular prediction. There's another method that you study also you want to tell us about that.

</turn>


<turn speaker="Shi Feng" timestamp="05:59">

So the other method is input gradient. So this is also borrowed from image classification. What you
do is you can back propagate for example from the laws of the model on entice example all the way to
the input. So in our case we back propagate to the word vectors. And then for language, because we
have discrete input, there's the question of how do we aggregate the input gradient with respect to
word vectors into a single scalar value. For each token, I personally believe that this is a
heuristic. There are multiple ways to do this. You can imagine doing a norm over the entire
gradient, or you can do a dot product with word vector itself, which is the one we chose in the
paper.

</turn>


<turn speaker="Matt Gardner" timestamp="06:42">

So just to be clear here, what you're doing is I'm going to see how much, if I change the the vector
of this particular word, I want to know how much does that change my prediction or the loss, which
is essentially the difference between my prediction and the gold value. Right? Can you convince me
that this is also a valid way of interpreting the importance of a particular word? I can see
intuitive, maybe this is true, but it'd be nice to be thoroughly convinced.

</turn>


<turn speaker="Shi Feng" timestamp="07:06">

Yes. So I guess first of all, the gradient with respect to word vectors is the best linear
approximation we have for the following thing. So the thing is if we change the word vector, how
does my loss change? The motivation for doing a dot product with word vector is the following. What
this does is approximates the effect of changing the one hot vector to a all zero vector. So we can
imagine the mapping from the discrete token to a word vector as taking the dot product of a one hot
vector with the word vector matrix. And this approximate is changing that one in the one hot vector
to a zero. The other explanation of this is changing the word vector to all zero.

</turn>


<turn speaker="Matt Gardner" timestamp="07:53">

Okay. And why are these gradients useful for understanding what the model is doing? Like intuitively
I can see that this probably makes sense. Is there a stronger argument than just an intuitive one?

</turn>


<turn speaker="Shi Feng" timestamp="08:05">

Yeah, so we can use the leave one out method as a ground truth for the Greek and based
approximation. And in our experiment we found that these two methods, so the leave one out and
gradient based approximation generates basically the same ordering of words based on their
importance. So we went with gradient approximation, which is more efficient.

</turn>


<turn speaker="Matt Gardner" timestamp="08:30">

Okay. Does this gradient based approach still have the same caveats about bag of words, assumptions
and so forth?

</turn>


<turn speaker="Shi Feng" timestamp="08:36">

Yes. So all of our experiments are based on gradient based approximation and these pathological
behavior we observe are also from this approximation.

</turn>


<turn speaker="Matt Gardner" timestamp="08:47">

Right. But as we'll talk about in a minute, you use gradient based stuff to leave words out and
you're still doing like a leave one out kind of approach. But in general, if I have arbitrary inputs
say squad, I have a passage and a question as input and I want to predict an answer as an output. If
I just look at gradient to the question, vectors in principle could capture more than just bag of
words. Is that true? Because the gradients will go through the LSTM. That's encoding the question.

</turn>


<turn speaker="Shi Feng" timestamp="09:15">

Yeah, but I think it's still making a linear approximation.

</turn>


<turn speaker="Matt Gardner" timestamp="09:18">

Okay, great. So I think we've got a decent handle on the background setting for this, these
different methods of interpreting. We're generally saying like if I perturbed my input either by
leaving a word out or by changing the vectors themselves, somehow how does this affect my confidence
in the output? And there are a couple of different ways to compute this. And then your paper comes
in and says, I guess you want to tell us what the contribution is from your paper.

</turn>


<turn speaker="Shi Feng" timestamp="09:42">

Yes. So on a high level, we take this logic or we can say a principle behind the interpretation
based or gradient based interpretation and take it to a limit. So what we do is, given a
interpretation, so given the importance of value for each word, we'll just remove the least
important word from the sentence. So by the definition of what importance, this will be to a very
small decrease in confidence or even an increase. So the model prediction should stay the same and
then we just repeat this process until the model prediction changes. So the interesting thing we
observed is you can actually do this for many, many steps. In one example that we showed in the
paper for squad question, we can reduce the question, "What did Tesla spend Aster's money on?"
question mark to just a single word "did" and still get the same prediction from the model with very
high confidence.

</turn>


<turn speaker="Matt Gardner" timestamp="10:42">

Wait, wait, wait. So you're saying I can totally remove all of the information from the question and
not change the model's prediction.

</turn>


<turn speaker="Shi Feng" timestamp="10:49">

Uh, yes, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="10:50">

How consistent is this across all of the questions? Is it just a few cherry picked examples where
this happens or is it pervasive?

</turn>


<turn speaker="Shi Feng" timestamp="10:57">

Right. So we repeat this process for the whole validation set and we basically find you can do this
consistently for basically all the examples. So for squad originally, the average question then is
11.5 words. But this reduce example, average sentence is only 2.3 words. And we actually also repeat
this process for to other data sets. So DQA and SNRI and observe the same phenomenon.

</turn>


<turn speaker="Matt Gardner" timestamp="11:25">

So can you help me understand what this means? Like in squad we have a passage and we have a
question and there are several different questions per passage on average and maybe what's going on.
Is there a few obvious answer candidates in the passage? Like you could imagine that there was
actually a paper by Mike Lewis and some folks that were doing a generative model of what kinds of
things people might ask about in the passage. So I could a priori find some candidate answers and
then I have like a single word that could indicate which of these possible answers I picked. And
that's essentially what's going on here because there's like this canned kind of simple kind of
question approach to squat. Does that make sense?

</turn>


<turn speaker="Shi Feng" timestamp="12:03">

Yes, I think it makes sense. And I agree that part of the reason that we observed this kind of
things is that the data set might contain artifacts that the model can exploit. So the model can
differentiate between several candidate answers by using just several words in the question.

</turn>


<turn speaker="Matt Gardner" timestamp="12:20">

And so if there was a much larger set of plausible answers that are observed in the training set,
like a whole bunch of different questions. If there were more questions per paragraph that had a
much more diverse set of possible answers, you would expect this to not work as well. Is that is my
intuition right there?

</turn>


<turn speaker="Shi Feng" timestamp="12:38">

Um, I think it's partly correct. What that doesn't address is why the model is making such a high
confidence prediction on a nonsensical question. A single word, "did".

</turn>


<turn speaker="Matt Gardner" timestamp="12:48">

Right. And My, again, you, you've, you've studied this a lot more than I have my guess here. You can
tell me if you agree with my guess. Is that there are really just a few candidates and the single
word in the question is enough to tell the model given the paragraph which of the candidates it has
to pick. And so this is as you say, an artifact of, of the simplicity of the data set.

</turn>


<turn speaker="Shi Feng" timestamp="13:10">

Right.

</turn>


<turn speaker="Matt Gardner" timestamp="13:11">

Cool. And then similarly you, you said you saw this for VQA and SNLI. Is it worth going into more
detail on some examples from either of those?

</turn>


<turn speaker="Shi Feng" timestamp="13:19">

Uh, yeah. I guess the VQ example we include in the paper is we have a picture of a flower that is
yellow. And the question is what color is the flower? And the model can't answer correctly yellow
with high confidence. When we do this reduction process on a question, we get a question of just
"flower" question marks so the human won't be able to answer yellow because the human won't know
what the question is asking about. But the model will still answer yellow with high confidence

</turn>


<turn speaker="Matt Gardner" timestamp="13:49">

And for SLNI the Stanford Natural Language Inference Data set.

</turn>


<turn speaker="Shi Feng" timestamp="13:54">

Yes. So this example has a premise, "well dressed men and women dancing in the street," and the
original hypothesis is "two men is dancing on the street". So the label is contradiction and the
model is predicting correctly. But when we reduce the hypothesis we can reduce it to just "dancing",
which doesn't really contradicts the premise of "man woman dancing on the street", but the model is
still predicting contradiction with high confidence.

</turn>


<turn speaker="Matt Gardner" timestamp="14:25">

Do you have any intuition for why it happens on this data set?

</turn>


<turn speaker="Shi Feng" timestamp="14:28">

Oh, you mean for SLNI specifically?

</turn>


<turn speaker="Matt Gardner" timestamp="14:29">

Yeah. So why is dancing a contradiction in this setting? Like I've done a lot with reading
comprehension stuff and so I had some intuition for what might be going on with squad SlNI is a
little bit more opaque to me.

</turn>


<turn speaker="Shi Feng" timestamp="14:42">

Yeah. So several recent papers pointed out that SlNI contains certain artifacts. For example, you
can train a model using only the hypothesis and still get decent performance on a test set. And
another recent paper, a lot of people pointed out that you can solve SNLI using essentially just a
word overnight between the premise and the hypothesis and I suspect that this example is a case
where the model is actually exploiting that artifact. So it's only relying on a single word, but in
this case it's making a wrong prediction.

</turn>


<turn speaker="Matt Gardner" timestamp="15:18">

Yeah, that's, that's the thing that's confusing me, it must have some bias where it expects to see,
well wait, that's not quite right. I was going to say, unless it sees opposite words, it's going to
predict contradiction, but it's not seeing opposite words than it is predicting contradictions. So
I'm, I'm still a little bit confused on this case, but we can just put it down to annotation
artifacts or something.

</turn>


<turn speaker="Shi Feng" timestamp="15:41">

Yeah, I don't think I have a good explanation for that. It's possible that this is just specific to
this verb dancing.

</turn>


<turn speaker="Matt Gardner" timestamp="15:46">

Okay.

</turn>


<turn speaker="Shi Feng" timestamp="15:47">

Oh, in our experiments we only remove words from the hypothesis.

</turn>


<turn speaker="Matt Gardner" timestamp="15:50">

Okay. We've talked about your method. You're going to iteratively figure out using this gradient
based approximation for interpretability, which word is the least important? And you remove it over
time and you see that that confidence stays high. I guess we haven't talked about like your
aggregate results on how confidence changes and some other experiments that you ran.

</turn>


<turn speaker="Shi Feng" timestamp="16:10">

Right, so about confidence. Oh, we just plot the density distribution of confidence on all the
validation examples and compare between the original examples and the reduce examples. What we see
is the confidence roughly stays the same and the weird thing is on DQA the confidence actually goes
up on reduce examples.

</turn>


<turn speaker="Matt Gardner" timestamp="16:29">

Yeah, that's interesting. I haven't done much work on DQA, but I'd guess that it's a similar kind of
thing for what I laid out for squad where there are certain things that are typically asked about an
image. And so with just a single word you can index into what was being asked quite easily.

</turn>


<turn speaker="Shi Feng" timestamp="16:46">

Yes, I agree.

</turn>


<turn speaker="Matt Gardner" timestamp="16:46">

And then you also looked at humans. I guess it's really intuitive that if you give this reduced
question to a human, they'll have no idea what's going on and you verified that. Right?

</turn>


<turn speaker="Shi Feng" timestamp="16:55">

Right.

</turn>


<turn speaker="Shi Feng" timestamp="16:56">

So we want to make sure that the reduce examples are not only short, but also just completely
nonsensical. So we show them to the humans and observed a drastic decrease in performance. The other
experiment we did with humans is we'll randomly reduce the text to the same length as the reduce
examples. So back to the squad example where the question is reduced to "did" by our process, we'll
randomly select a single word from the question and show all three versions of the question to the
human and ask them to choose between the portion reduced by our method and the randomly reduced one.
This is to verify that these examples appear just random and the human basically have no preference,
like no significant preference of one over another.

</turn>


<turn speaker="Matt Gardner" timestamp="17:45">

So you ran experiments showing that on your reduced examples, the model gets similar performance.
Actually, I guess by definition it's going to get the same performance, right?

</turn>


<turn speaker="Shi Feng" timestamp="17:54">

Yes. Yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="17:55">

What about on the random examples? Did you try evaluating on the random questions also with the
model?

</turn>


<turn speaker="Shi Feng" timestamp="18:01">

Yeah, so this is something that we didn't report in the paper. On random example the model
performance will decrease very much. I guess as a side note, I don't remember if performance
decrease, larger than human performance, but we definitely are not getting the same performance as
these reduce examples.

</turn>


<turn speaker="Matt Gardner" timestamp="18:18">

Okay. I remember from your talk you talking about this, I don't skimming over your paper, I'm not
sure I see it in here. Did you train your model on the reduced example? So like retrain from scratch
on just the reduced examples?

</turn>


<turn speaker="Shi Feng" timestamp="18:30">

Yeah, so we did that for SLNI just as exploratory experiment and it's kind of surprising that we get
exactly the same performance as a model trained on full examples. So I guess just to clarify, what
we do is we do this process for all the training samples. We train a model from scratch on the
reduced training examples and we test on the reduced test examples. So originally we thought that
this means that the data set can be solved using only parts of the input. And then we realized that
there's actually a leaking problem because the reduction is done using a model that has seen the,
for example, this model is passing some knowledge through the reduction process. But the thing that
we know from this experiment is this reduction process is doing some meaningful selection. It's not
like completely random.

</turn>


<turn speaker="Matt Gardner" timestamp="19:21">

That's a good point. It's still really interesting. Like just thinking about squad and I know you
didn't run this on squad. I imagine you'd see similar results though. And to me very much confirms
this selecting from which particular answer choice you want in the question.

</turn>


<turn speaker="Shi Feng" timestamp="19:37">

Yeah, I think that's,

</turn>


<turn speaker="Matt Gardner" timestamp="19:38">

That's really interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:39">

So I wonder if you had a chance to try different models and see how the choice of the model matters
in how much reduction you can get.

</turn>


<turn speaker="Shi Feng" timestamp="19:47">

Yeah, so we didn't do this experiment on a large scale, so we didn't do this for all three data
sets. But on SNLI, we actually tried two different architectures and we get consistent results.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:00">

So by ecosystem results, you mean you can usually get to the same average length?

</turn>


<turn speaker="Shi Feng" timestamp="20:04">

Yes.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:05">

And they're not introduced.

</turn>


<turn speaker="Shi Feng" timestamp="20:06">

Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:06">

Interesting. I'm curious if models that are not neural would behave differently and yeah, I would
expect like certain models and in the neural network to be more susceptible to this, this behavior.

</turn>


<turn speaker="Shi Feng" timestamp="20:19">

Yeah, I think that's possible. But I guess to ensure kind of a fair comparison, we need the model to
have roughly the same regular performance. So if we test this, I suspect that we probably won't see
the similar behavior with a say linear model, but a linear model won't achieve the same regular
performance as a neural model on say squat.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:42">

Yeah, I mean, but the focus in this work I think is to understand what the model is doing. So we
want to be able understand a variety of models.

</turn>


<turn speaker="Shi Feng" timestamp="20:49">

Yeah. I think it will be interesting to try more architectures. Um, but in this paper we only tried
it the selected ones.

</turn>


<turn speaker="Matt Gardner" timestamp="20:55">

Though, you did modify the model afterward to try to mitigate this, which I thought, to me, this was
the most interesting part of this paper. So do you want to tell us what you did on this entropy
regularization stuff?

</turn>


<turn speaker="Shi Feng" timestamp="21:06">

Yes. So on these reduce examples, the ideal model behavior should be the model. Say, I don't know
what the answer should be. And mathematical this means the model should output a uniform
distribution over all the possible answers, which basically just implement this using entropy. So
what we do is in addition to the regular maximum likelihood objective on regular examples, we take
the reduced examples. So in this case, reduce training samples and add a entropy regularizer to the
objective. And what we do is we find tune from a model train in a regular way.

</turn>


<turn speaker="Matt Gardner" timestamp="21:43">

So intuitively, I guess rephrasing this to be sure I understand. I'm going to take a trained model
and then I'm going to penalize the nonsense inputs to have a uniform distribution over my outputs.

</turn>


<turn speaker="Shi Feng" timestamp="21:55">

Yes, exactly. So mathematically this is equivalent to confidence penalty for labels moving, but the
differences, we're doing this specifically on these reduce examples, not all regular examples.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:07">

So the reduced examples are reduced in the way that you described earlier or are they randomly
selected as a subset of the original imput?

</turn>


<turn speaker="Shi Feng" timestamp="22:16">

Yeah, that's a good question. So what we did was we take the ones reduced by our method. And I guess
another result that we didn't mention in the paper is we also tried regularizing our reduce examples
actually achieved some mitigation on this weird behavior, but regularizing on randomly reduced
example didn't achieve that. Interesting. So there's something special about the examples reduced by
this method.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:42">

Is it truly a bad thing that the model is able to make a good prediction or a correct prediction
using a subset? Like a small part of the sentence. I think it's not necessarily a bad thing. It
maybe exactly the right thing to do. Right. But you're saying that when you do it this way, when you
use your method to reduce the input, you get improved performance, overall

</turn>


<turn speaker="Shi Feng" timestamp="23:03">

Improved performance in the sense that the model behaves more in a more reasonable way under info
reduction.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:09">

Does the final score on the original task improve?

</turn>


<turn speaker="Shi Feng" timestamp="23:12">

It remains essentially the same. We see a small improvement on squad.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:16">

Well I guess in that case, let me push a little harder here cause I don't think necessarily this is
a desirable property, right? If assuming that, in the cases where the reduced input actually
captures the essence of the question or the essence of the input, we want the model to be able to do
it.

</turn>


<turn speaker="Shi Feng" timestamp="23:33">

Yes. I think that's a good question. So I guess a more general version of that question is what
examples should we consider as nonsensical for a task? I think part of the reason why regularizing
on randomly reduce examples even work is that sometimes if we randomly select a word in the
question, this word might capture the essence of that question. For example, if the VQ example, if
the question is is reduced to color question mark, then the human would be able to answer correctly.
I guess the justification of using reduce examples is through human experiments. We see that these
examples are usually nonsensical, kind of justifies that a random guess is the desired behavior.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:14">

Great. Okay. I think that makes sense. If you already know this about this particular model, but in
principle we don't know this for any given model. So we may want to first test whether the
particular model we're using is doing a good job with a reduction or not. And then if it's not and
maybe we can augment our objective accordingly. Is that roughly what you recommend?

</turn>


<turn speaker="Shi Feng" timestamp="24:35">

Yes, I think that makes sense. Yeah. So we should definitely see if the reduced examples make sense
or not for a particular model, although I guess that different architectures trained on at least
these three data sets might roughly demonstrate the same problem. I guess what I'm trying to say is
I think this is more of a data set problem than a model problem. So I guess, a piece of evidence for
that is we actually tried checking whether these reduce examples are transferable in that we reduce
these inputs using one model, take the reduce example and test it on a different architecture and
see if the model still make the same prediction with high confidence. We tried it for some subset
of, SNLI examples, and I think more than 70% of the examples that we tried actually transferred. So
that kind of says that these two different architectures have similar problems

</turn>


<turn speaker="Waleed Ammar" timestamp="25:30">

And by transferred here do you mean you were able to reduce the sentence significantly without
changing the prediction?

</turn>


<turn speaker="Shi Feng" timestamp="25:35">

Yeah, we are able to significantly reduce the example using model "A" and these reduce examples will
achieve the same effect on model "B".

</turn>


<turn speaker="Waleed Ammar" timestamp="25:43">

That's very interesting. I wonder if we can do the same with different data sets on the same task.

</turn>


<turn speaker="Matt Gardner" timestamp="25:48">

Yeah, that's a really strong argument that this is a data set artifact and not like it's something
that the model is picking up on.

</turn>


<turn speaker="Shi Feng" timestamp="25:54">

Yeah, I think so. And it will be interesting to see if this works on our scope.

</turn>


<turn speaker="Matt Gardner" timestamp="25:58">

Great. I think we didn't actually talk about the results of this entropy regularization stuff that
you did. Do you want to tell us the experiments you ran?

</turn>


<turn speaker="Shi Feng" timestamp="26:08">

Yeah. So first as a percentage check, we are able to achieve the same performance on regular
examples so we don't lose a lot of performance we are using entropy regularization. And the second
thing is we repeat this reduction process on the validation set using the regularized model. And all
we see is basically the model behaves in a more reasonable way. So first we won't be able to reduce
the example by that much. So the length of the reduced example increased significantly and the
confidence on the reduce examples and the original examples are better separated.

</turn>


<turn speaker="Matt Gardner" timestamp="26:42">

And just to quantify this a little bit, looking at your paper, this is table two for anyone who has
the paper with them, you report that before the entropy regularization on squad, the average length
is 2.3 words of your reduced example. And then after you do this it's, it becomes about five words
on average. So you've basically doubled the size of the reduced question.

</turn>


<turn speaker="Shi Feng" timestamp="27:04">

Oh yes, that's correct.

</turn>


<turn speaker="Matt Gardner" timestamp="27:04">

And for SNLI it goes from 1.5 to 2.2 and VQA goes from 2.3 to 2.9 so these increases in the reduced
size are much smaller for SNLI and DQA than they are for squad. Do you have any intuition for why
that happened?

</turn>


<turn speaker="Shi Feng" timestamp="27:21">

I have some explanations. So I think the fact that squad requires a spend prediction definitely is
affected. So in our common squad model, you generate an attention map over all the possible starting
positions of the span and generally the similar attention that for the ending position of the span.
So if one of the position changes, the prediction changes. So it's easier for the model to switch
predictions. I think the other factor is the length. So when we plot the distribution of length of
inputs for the three tasks on the original model before requisition, the length of reduce examples
and original examples are better separated for squad. So that might make regulation easier.

</turn>


<turn speaker="Matt Gardner" timestamp="28:08">

I see. I may just be looking too hard at the absolute numbers because if you look at percentages,
percent difference, maybe they're much closer that's another way of saying what you just said. I
think that SNLI average example length is 7.5 whereas for squad it's 11.5 so like the original
examples longer and so the percent improvement is maybe closer.

</turn>


<turn speaker="Shi Feng" timestamp="28:29">

Yes. Yes, I think so.

</turn>


<turn speaker="Matt Gardner" timestamp="28:30">

But I, I liked your point also on the entropy regular regularization it's just a stronger signal
when I have a larger output space, which is true for for squad,

</turn>


<turn speaker="Shi Feng" timestamp="28:40">

Yes, I agree.

</turn>


<turn speaker="Matt Gardner" timestamp="28:40">

Which is a good point. The reason that I thought this was so interesting was I wondered what other
areas this was applicable to because basically what you're saying is if I have some method automatic
or whatever of finding nonsense inputs like variance in my input, I can get a more robust model by
doing this kind of regularization.

</turn>


<turn speaker="Shi Feng" timestamp="29:01">

Uh, yes, I think so. So I think constructing negative examples and doing entropy regularization is
generally applicable to other classification tasks. It's similar to labels moving and confidence
penalty, but the motivation is slightly different. So there their motivation was they want to deal
with the noise in the labels, in the training data. So they don't want to be too confident about the
training samples. In our case, we're specifically constructing negative examples. I guess the trick
is how can we define nontrivial nonsensical examples in NLP for given task?

</turn>


<turn speaker="Matt Gardner" timestamp="29:37">

Yeah, that's a really interesting question. I guess another way to evaluate this, I don't know if
you've, you've done this, I don't think it's in your paper, but you may have done it since test
domain adaptation. If I train on some data set and then test on an out of domain, same task data
set, I would expect that entropy regularized model would transfer better.

</turn>


<turn speaker="Shi Feng" timestamp="29:56">

So actually we tried something like this but it didn't quite work. One intuitive explanation of what
entropy regularization is doing is kind of removing the artifacts from the model and what we did was
we take infer scent, which is trained on SLI, a sentence embedding trained, SLI, we take that and we
do entropy regularization of a percent and try to see if the transfer performance of other
classification tasks increase. We didn't spend enough time on that to make it work, but I think
that's one direction that I think is very interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="30:30">

Yeah. I guess then sentence vectors and sentence classification seems particularly hard. If there
are other reading comprehension kinds of data sets transferring say from squad to Trivia QA or
something. I don't know. I just, I wonder if this would make it more robust. I hope that we can
figure out methods to do this and this sounds like a promising one. It's just I guess it needs more
work to figure out.

</turn>


<turn speaker="Shi Feng" timestamp="30:51">

Yeah, I think entropy regularization is unique in that it's targeting a specific model behavior
compared to say adversarial training.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:59">

Yeah. I wonder if there's also ways to modify the input to remove some of the information out of it
without breaking the grammaticality of the input. I wonder if you've seen anything like this before,
like replacing a word with another word from the same categories, from the same syntactic category
that has less information or it's more common? I don't know.

</turn>


<turn speaker="Shi Feng" timestamp="31:20">

So I think this kind of word replacement or paraphrasing of examples is commonly used for
constructing examples for metro language processing tasks. So the goal there is actually to keep the
meaning of the sentence. I don't think I've seen work where the goal is to perturb the meaning of
the sentence. Yeah. I don't have an idea of top of my head how to do that.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:43">

Yeah. But that, that might work. Yeah. Yeah. Like with would they different objective. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="31:48">

Well Great. This has been a really interesting conversation. I feel like we're at a point in NLP
where we need a whole lot more work on trying to understand what's going on with all of these crazy
huge models and your paper is a very nice contribution. Along those lines, is there anything that
you wanted to talk about that we missed or do you have any last thoughts before we conclude?

</turn>


<turn speaker="Shi Feng" timestamp="32:05">

Yeah, I guess I would just mention, so in the paper we discussed two possible explanations for why
we observed these weird behaviors. So we mentioned that leave one out and gradient based
approximation are making this bag of word assumption about bottle and it's clearly not a true
assumption. And we actually observed cases where this assumption breaks under info reduction. So
what we see is when we remove an unimportant word from the sentence, a very important word suddenly
becomes all important. So let's say we have word "A"and word "B", word "A" is of high importance,
"B" is all important. And we take out word "B" and suddenly word "A" becomes all important. So this
is a higher order correlation between "A" and "B". And what this means is that word "A" is only
important in the context of word "B". So this is showing where the linear assumption breaks,

</turn>


<turn speaker="Matt Gardner" timestamp="32:59">

right. And so we talked at the beginning that we're implicitly assuming some bag of words and here
you have strong evidence that this isn't actually what's going on.

</turn>


<turn speaker="Shi Feng" timestamp="33:07">

Yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="33:07">

I guess do you, do you know of any interpretability methods that don't make this back and forth
assumption? Like are there hints in the future that we'll have better ways to understand what's
going on?

</turn>


<turn speaker="Shi Feng" timestamp="33:18">

I probably shouldn't talk about that.

</turn>


<turn speaker="Matt Gardner" timestamp="33:20">

Stay tuned for more work.

</turn>


<turn speaker="Shi Feng" timestamp="33:22">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="33:23">

Great. Cool. It was, it was nice talking to you. This is really interesting.

</turn>


<turn speaker="Shi Feng" timestamp="33:26">

It was nice talking to you too.

</turn>
