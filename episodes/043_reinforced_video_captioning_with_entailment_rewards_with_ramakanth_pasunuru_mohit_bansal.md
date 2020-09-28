---
title: "Reinforced Video Captioning with Entailment Rewards, with Ramakanth Pasunuru, Mohit Bansal"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Mohit Bansal","Ramakanth Pasunuru","Speaker 1"]
number: "043"
tags: []
description: "EMNLP 2017 paper by Ramakanth Pasunuru and Mohit Bansal Ram and Mohit join us to talk about their work, which uses reinforcement learning to improve performance on a video captioning task. They directly optimize CIDEr, a popular image/video captioning metric, using policy gradient methods, then use a modified version of CIDEr that penalizes the model when it fails to produce a caption that is _entailed_ by the correct caption. In our discussion, we hit on what video captioning is, what typical models look like for this task, and how the entailment-based reward function is similar to other attempts to be smart about handling paraphrases when evaluating or training language generation models. Unfortunately, due to some technical issues, the audio recording is a little worse than usual for this episode. Our apologies. https://www.semanticscholar.org/paper/Reinforced-Video-Captioning-with-Entailment-Reward-Pasunuru-Bansal/0d11977afa1a6ce90dc3b1f26694492c2ab04773"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:11">

Today our guests are Mohit Bansal and Ramakanth Pasunuru. They are at UNC Chapel Hill. They
coauthored a paper title Reinforced Video Captioning with Entailment Rewards and the paper is
talking about how to improve sequence-to-sequence modeling for video captioning by modifying the
objective function. So could you tell us a little bit about what's the objective for doing this
work?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="00:47">

So the reason why we want to do this primarily for video captioning because it's a more complex task
than the present image captioning and it has a complex temporal and across them dynamics. So we
chose video capturing as our task. And the reason why we did reinforcement learning is so the the
current cross-entropy loss function has a problem of exposure biases issue and also the training is
done on a world level cross-entropy and is evaluated on a sentence level matching metrics. So these
are the two reasons why we moved on from cross-entropy loss to reinforcement based policy gradient
approach. So in the policy gradient approach we can address these.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:50">

Could you elaborate a little bit on the exposure bias, could you explain to the audience why is this
a problem?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="01:55">

So the problem with the exposure bias is currently, so when we are training with the cross-entropy
loss during training the models are exposed only to training distribution, but not its own
predictions. But when we are doing inference, we are using its own model predictions. So, there is a
mismatch between the training and testing. So, this effort caused exposure bias where a model is
only exposed to training, distribution but not its own predictions. So this is one issue that can be
addressed through reinforcement learning based policy gradients. And the second reason is again we
are optimizing the cross-entropy loss. But however finally we are evaluating the performance of our
models on a automatic evaluation phase-matching based metrics like BLEU score METEOR, CIDEr. So,
again, there is a mismatch also here where the optimization function is, the final evaluation is on
something else and we are optimizing or something else.

</turn>


<turn speaker="Mohit Bansal" timestamp="03:09">

Great. So basically in summary like the point is that if you use something like reinforce policy
gradient optimization, then it solves both purposes, right? So it's able to, because you are
sampling full captions from the model you are basically sampling from the like the model
distribution itself. So it helps the exposure bias mismatch and you are also able to directly
optimize sentence level metrics because you sample the whole sentence, then you compute it's reward,
and then that feeds back as, you compute it's a phrase matching metric at the sentence level. And
then that whole metric score feeds back as a reward to policy gradients, right. So this is a very
old idea. Obviously. the initial motivation was that this hasn't been done for video captioning at
all because people have tried this very recently for image captioning and then before that also for
a summarization in 2015 by Ranzato et al.

</turn>


<turn speaker="Mohit Bansal" timestamp="04:10">

But then since video captioning is a very perfect kind of sequence-to-sequence task right, it needs
a lot of sequential information temporal actions as compared to an image captioning task, which is a
single CNN most of the time on the encoder side. Right, it's just one frame. So that was kind of the
first very first step. But I mean, that wasn't really the motivation. The motivation was that even
if you do all this we kind of jumped a step ahead. We said people are using all these phrase
matching metrics for rewards. But the metrics themselves are a big problem. What we are doing is we
take this sampled caption and then we say, okay, how well does it match with the ground truth
caption or it could be a summary or an image caption or a video caption.

</turn>


<turn speaker="Mohit Bansal" timestamp="04:56">

But the problem is that then this matching is used, is calculated using BLEU or CIDEr or some sort
of phrase matching metric. And if you look at image, figure, table one, I guess, yeah, if you look
at table one in the paper that's kind of the crux of the paper, right? What we found is, which is
very intuitive in hindsight is that all these metrics allow very kind of crucial or very notorious
contradictions and spurious information to creep in, right? Because if 90% of the phrase matches,
they're happy. So if you look at examples like a man is cutting the meat, a monkey pulls a dog's
tail, a monkey pulls a woman, the dog is jumping in the snow, the dog is jumping into cucumbers,
right? So the left side column is the actual caption. But if you sample your model sampled caption
is totally wrong in just one word, but a very important contradiction word, the phrase matching
metric CIDEr, which is one of the most popular ones right now.

</turn>


<turn speaker="Mohit Bansal" timestamp="05:58">

Because it uses this consensus information between human differences it gets very high scores,
right? That's based on average CIDEr is on this dataset and this task these are way above average
CIDEr scores. But then we figured that the more important part is to make sure that the match is not
just a phrase level bi-directional match, but it has to be a directed match, right? You have to make
sure somehow that the match is a directed partial match. If it is a partial match, it has to be a
logical match, right? In the sense that it should not, the ground truth, the sampled caption should
not contain extra or contradictory information as compared to the ground truth caption. So that's
where the whole motivation of logical entailment came in. Okay, we can do this, or we can capture
this by making sure that the sample caption is logically entailed or is a logical subset of the
information contained in the ground truth caption.

</turn>


<turn speaker="Mohit Bansal" timestamp="06:52">

So it's a less than equal to, which means that it should not bring in contradictory or extended
information. So that's what, table one is basically summarizing the idea, right? So then if you look
at the last column, you can see that we have a very kind of simple, easy way to figure out this
contradiction or this mismatch because the CIDEr scores are very high. But if you run an entailment
classifier between the ground truth as the premise and the sampled caption as the hypothesis, the
entailment scores are very, very low for all these cases. And these are not even ground. Like, I
don't think these are terrible like this. This is a randomly pick cases where CIDEr was very high,
but entailment can catch this issue that, no, wait, this is not a good, this case, this sample
caption should not get a high reward even if CIDEr is high. So that's all we do basically. You then
correct your CIDEr based phrase matching metric using entailments. So you say the reward gets a
penalty if entailment is very low and that gives a statistically big jumps on I think all the cases.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:05">

I think you also have an evaluation with a human.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="08:13">

So if you've see in the paper that's the primary research where we preform the experiment on MSR-VTT
dataset it has it on 7,000 videos for training and that on 2500 videos for testing and first what we
did was we did a simple cross-entropy based approach with attention based bi-directional encoder
LSTM-RNN model. Then on top of that, then we

</turn>


<turn speaker="Mohit Bansal" timestamp="08:48">

I think that's already a, yeah. So the third last row in table two is representing a baseline video
captioning model, with all the kind of standard pieces bi-directional encoder, uni-directional
encoder on video frames bidirectional decoder. So that's already I think better than, or at least
equal to most state-of-the-art methods.

</turn>


<turn speaker="Matt Gardner" timestamp="09:09">

Can we pause here for a minute and backup just a little bit. So this is NLP highlights. I imagine a
lot of people on this wont have really thought about the problem with video captioning before. So
can you tell us how these video captioning models even work? Like what, what's the end? So you have
a basic encoder decoder kind of set up that people have probably seen in machine translation or
other kinds of models, but the encoder is pretty different when you have a video. Can you explain
what this looks like?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="09:38">

Yeah, so for the encoder, you can assume that it's a sequence of frames. A video is a sequence of
frames. And we encode each frame using inception.

</turn>


<turn speaker="Mohit Bansal" timestamp="09:58">

I think we start all the way from should start from how we get the frames from the video.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="09:58">

Yeah. So, given a video we sample the video as it appears that is three frames per second. And we
gave the frames, and stop the video.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:10">

So, this is a standard approach?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="10:10">

And once we have frames we can work these frames in different features. So these features can be
resonant features or inception features. These features are from the image classification, model
where the rearrange the image in terms of a feature. So we define each frame as a feature.

</turn>


<turn speaker="Mohit Bansal" timestamp="10:31">

So these are big CNN, I guess, networks named on ImageNet, the vision image classification task.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="10:39">

Yeah. So once we have these features. Now we can assume that the reader is a sequence of a frame
level features. So now we give each time step we give this a frame level, implemenation feature as
input, and we encode all the information as a sequence. So this is a bi-directional algorithm.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:03">

And usually how long do these videos tend to be?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="11:05">

These videos are around an average 12 to 15 seconds. [inaudible]

</turn>


<turn speaker="Mohit Bansal" timestamp="11:17">

Yeah. So these are video clip datasets. So most of them are like 20, maybe between 15, 10 to 30
seconds. So yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="11:26">

So we're looking at like 60 times steps or so,

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="11:30">

Exactly.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:32">

And the ground truth is usually just a sentence.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="11:36">

Yeah. The ground truth is the caption, so each, so every clip has a single caption. So it doesn't
have multiple summaries of what's happening. But every clip is attached to a caption, which is
usually a single sentence most of the time.

</turn>


<turn speaker="Mohit Bansal" timestamp="12:01">

That is for an automated encoder.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="12:01">

And then the attention we usually use the Bahdanau's attention mechanism, where once we encode these
video features on the inputer side, or we take the hidden state or the implementations of these
encoder and attend at each time step of the decoder for video generating. Next we attended to the
parts of the video.

</turn>


<turn speaker="Mohit Bansal" timestamp="12:27">

Yeah. So it's a very simple baseline. Like the, I think a, in the related section of the paper we
mentioned all kinds of fancy techniques that people have tried, I think mostly in the vision
community, but some in the NLP where you can have hierarchical of encoders, right? So Matt was
asking about 60 frames. If you are sampling at a smaller rate, then you'd have more frames and you
can do a hierarchical encoder, like a two level. Then people have done, I think Ram mentioned like
the temporal versus spatial attention. So basically the one attention that we are doing is kind of
temporal, right? Basically each word is figuring out which temporal frame to align to or a
combination, whereas spatial attention is inside the frame. So we also tried a little bit of that
where you can have two types of attention, temporal attention across frames and spatial attention
inside the image of each frame. But the, basic idea is that all of these, like you can just go very
simple, bi-directional encoder decoder, but on our attention and it's already greater than or equal
to most complex techniques. So the baseline just represents a simple reproducible approach.

</turn>


<turn speaker="Matt Gardner" timestamp="13:33">

How does spacial attention work? The way I understood what you described was that I convert the
ImageNet features or the inception features to a vector and I feed that vector into a bi-LSTM.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="13:47">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="13:48">

Haven't I lost spatial information at that point?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="13:51">

So if we are doing an ultimate layer we still have their own rendition of the information. So in the
image classification world, the final layer is about classifying objects just objects. But if you go
one layer before that, before the penultimate layer, this has a concentrated representation of the
whole image.

</turn>


<turn speaker="Mohit Bansal" timestamp="14:21">

Right? So people take this, there are different layers. I got FC7 FC4 FC6. So you can look at the
layer, which still maintains the sub image or super pixel features.

</turn>


<turn speaker="Speaker 1" timestamp="14:34">

One other question. Do you, do you train the inception model?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="14:39">

No.

</turn>


<turn speaker="Matt Gardner" timestamp="14:39">

So you're just training the bi-LSTM on top of all of that. Okay. I was thinking 70,000 sentences
doesn't seem like a whole lot of supervision to learn this.

</turn>


<turn speaker="Mohit Bansal" timestamp="14:52">

We have vision people and that's usually, yeah, we don't want it. That's a big complaint in there.
Like a month training usually. Yeah. We just pick the best current like resNet v-4 whatever the best
version of a connection based tag CNN network. But anyway, what I was saying that's the baseline and
then we have these two steps. If you look at table two then CIDEr-RL first of all is the first
contribution where all we did was we said, okay, let's do some sequence level training for video
captioning, because that's never been done before. So all CIDEr-RL does is use a CIDEr metric as a
reward, sentence level reward and feeds that into the reinforce policies gradiant method.

</turn>


<turn speaker="Matt Gardner" timestamp="15:36">

One other question here again I had never seen CIDEr before. I read this paper. Maybe I'm just not
up to date on new metrics but can you explain this for our audience?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="15:46">

Yeah. So this is a more image captioning side of people use CIDEr more because when you have a lot
of references, especially in MSR-VTT Dataset, we have one data reference every video. And the other
dataset, what you do is take have our data reference for every video, and you have a lot of
references. So CIDEr gathers layers the consensus among the human defenses. So it's much more, not
only this based on matching with the respect of the ground truth versus a generator, but also how
much among the references, how much human are not in consensus among each other. So, the more the
number of references we have, the better the CIDEr metric is working. So in a video captioning and
image captioning world we have multiple references for each caption or each image or the video. So
it is shown that CIDEr is a good metric to evaluate.

</turn>


<turn speaker="Mohit Bansal" timestamp="16:50">

Yeah. This was by the Virginia tech or now I guess Georgia tech. So my colleagues Devi (Parikh) and
Dhruv (Batra) did this paper in I guess 2014, basically the usual kind of metric paper where they
showed that this is much more highly correlated with human evaluation than some other metrics. Yeah.
So based on the idea that you don't just check for matches, but you check which match also has
consensus with the multiple Turkers who wrote the different captions.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:20">

So when you compute BLEU score my understanding is that if you're generated text overlaps with
multiple references, it does count for more than just once. So how is that different from what CIDEr
is doing?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="17:36">

So CIDEr is something where, so in BLEU score we match each reference with each reference caption
with our generated caption. And out of all the references we find maximum BLEU score that we got. So
we are only focused to particular reference with respect to the ground group. In CIDEr if multiple
references are talking [inaudible] is the often the the reference that is usually by many other
factors in writing the caption. Then they give high rate to these words.

</turn>


<turn speaker="Mohit Bansal" timestamp="18:14">

Yeah, but I think Waleed is saying that there are variations of BLEU that also do this. So maybe
they didn't compare to that, but we should check the CIDEr paper more carefully. Waleed said there
are variations of BLEU where they don't just max over the references, but sum of the references.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:30">

That's my recollection, but it has been a long time since I worked with machine translation. So it
was more of a question.

</turn>


<turn speaker="Mohit Bansal" timestamp="18:36">

We will check that again? But it's been a long time even for us in terms of this paper. But in
general like, yeah, I mean, so we can point you to the CIDEr paper, which compares to all kinds of
GLEU and METEOR and all of the metrics. And it's a very studied kind of an well appreciated metric
in the caption community. Yeah. So just to finish that previous part, all I meant was, and we can go
back to the model site, but for the test set, what I'm saying is that the first, like the second
last row CIDEr is just showing that by just adding a metric level reward in the sequence level
training, you can already get all those result improvements are statistically significant over the
baseline.

</turn>


<turn speaker="Mohit Bansal" timestamp="19:19">

And then you can, the last row is work that you can do better is that okay CIDEr itself as a reward
has a lot of issues, it just looks for a phrase matching it can creep in contradictions and so on.
So then when you make it CIDEnt out of the CIDEr class entailment, which we can define again in a
bit, then you get another round of statistical improvements on top of CIDEr-RL. So it's kind of
cascade like CIDEr-RL is statistically better than the baseline, which is already a state-of-the-art
baseline. And then CIDEnt is statistically better than CIDEr-RL. And if we go back to sports, and
this is true also for human evaluation, if you look at table three and four.

</turn>


<turn speaker="Mohit Bansal" timestamp="19:59">

But yeah, if you think we jumped ahead then we can go back to section four page four I guess. So the
CIDEr formulation is maybe we glossed over that a little bit. So in question five is the CIDEr
formulation. Yeah, and we kept it very simple, like maybe Ram, do you want to go ahead?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="20:23">

Yeah. So we defined this new CIDEnt which is a combination of CIDEr and entailment scores, like we
penalize our CIDEr score whenever our entailment score is very low. So for example, if the
entailment score is less than beta, in particular we chose .33 as the beta value. And if entailment
score is less than that we penalize over CIDEr metric with some constant lambda, otherwise we give,
the usual CIDEr score. So the reason for using this kind of formulation is we don't want to
completely deviate from our actual base matching metric, but we indeed want to penalize it whenever
it is going wrong or whenever it is deviation from the truth. So whenever it is giving false scores,
we correct them but penalizing it using a our entailment scorer.

</turn>


<turn speaker="Mohit Bansal" timestamp="21:24">

Right? I guess. Yeah. So the idea was on CIDEr like we don't, like we did try this entailed score as
a reward. And as you can imagine in hindsight, that shouldn't work because just entailment as a
score is missing a lot of information, right? You still want the reward to be basically about how
much does the sample generation match the ground truth caption. But so that's where you have to back
off to CIDEr. But you want to correct CIDEr whenever the entailment is very low. And all the Alpha
Beta values are very intuitive. Like Beta is just 3.33 like a third, right. Because it's a three way
classifier, we use the standard, I think we use the Google decomposable attention entailment
classifier. So it's a three way classifier in the SNLI task where its entailment, contradiction or
new group. So beta, like if you said entailment property less than 0.33, that already means that
it's guaranteed that this is not an entailment, CIDEr contradiction or it's a neutral. And then
Gamma was also, sorry Lambda turned out to be very intuitive too. Like you can basically set it to
the average value of CIDEr on that task. So you can basically subtract the average amount of CIDEr
that you get on that task as the penalty value.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:45">

So are you arguing that we should also use the augmented CIDEr or what you call CIDEnt as an
evaluation metric in the future whenever we're doing video captioning? Or are you proposing that we
should use it in order to define the reward function?

</turn>


<turn speaker="Mohit Bansal" timestamp="23:04">

Yeah, that's a good question. And we've heard this multiple times. And if you see the table, we did
report it as a metric to like the CIDEnt second last column in table 2. But I think in hindsight we
were not comfortable still promoting it as a metric because first of all, like you don't really want
a metric that relies on a classifier, I mean, I know we sometimes have to because and people have
started doing that in many areas. But again, at the end of the day, it relies on a classifier,
right? So they might be at all of those issues of adversarial and also in generated word if you
don't have a good entailment classifier for a certain random new domain? So we didn't promote it
very highly as a new metric. I think it's good, definitely as a reward because if you just use
vanilla metrics as a reward, we showed that they have a lot of issues. So definitely correct your
rewards. Using logical constraints as a metric we haven't done the full study of like explore
relation with human evaluation and all that. So that feature isn't really clean right now.

</turn>


<turn speaker="Matt Gardner" timestamp="24:08">

So this idea of using entailment to decide whether the caption is good or not seems really good and
intuitive. And it's not surprising to me that this helps. It's a really nice idea. I wonder though
at the equation, why subtract a constant, why not subtract something that is proportional in some
way to the entailment score itself? Like the specifics seem a little bit interesting to me. Like
why, why did you choose what you chose?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="24:41">

So if we want to introduce entailment score into our finally equation as well, then we have a
problem with balancing these metrics. So the proportions of CIDEr ranges from zero to 10, and
entailment score is from zero to one, we have to have a proper weight, a parameter, hyperparameter,
which should balance these out proportions. So then we came up with a simple solution penalize the
metric until the network has constraint this coder. We tried a combination of CIDEr plus some weight
times of entailment as our reward.

</turn>


<turn speaker="Mohit Bansal" timestamp="25:30">

Yeah. When people have done this for image captioning, I think they had this thing called, I don't
remember, but it mixed BLEU plus CIDEr plus METEOR plus ROUGE , like they took all the metrics and
then they used some weighted combination of these as a reward. And I think it was a Google paper two
years back and it seemed very painful. Like in terms of how to learn the weights or how to mix those
rewards because each reward is not, sorry each metric is not just a different scale, but the
improvement in each metric is also for a different scale. So like, just learning how to balance
those weighted weights in the weighted combination is usually very kind of either unstable or you'll
have to keep changing it for every task or even every dataset. So then we came back to this thing
where let's just keep CIDEr as the original reward, but we'll just penalize it.

</turn>


<turn speaker="Mohit Bansal" timestamp="26:21">

And luckily it seemed like using the penalty equal to the average CIDEr value. Just worked with some
light tuning. That being said, I think one important point that might be related to your question is
to learn the Lambda itself, right? And this is something that we are partially doing because of the
baseline estimator, right? So in a reward there's always a baseline estimator. This also dates back
from several reinforce based papers. So there's this whole area of called active critic networks,
right? Where basically if you look at question 14, but it's called the baseline estimator, which is
something very common when you're doing reinforce style policy gradient and where you add this minus
B term BT, depending on the time step to basically act as a baseline estimator or to reduce
instability, right? So the critic is trying to make sure that it learns better reward value and it's
able to normalize the reward.

</turn>


<turn speaker="Mohit Bansal" timestamp="27:18">

And it's also able to fire a reward only when the reward will help make the model better than the
current test time model itself. Right? So there's a whole chain of papers on active critic networks
and this kind of feeds into your question Matt where if we are learning that beta itself the B
value, sorry, that's kind of effecting the reward over a reward function. So in some sense it's
trying to learn the penalty also indirectly. So that's some followup work that we're doing currently
where we are trying to see if we can learn that Lambda the penalty directly.

</turn>


<turn speaker="Matt Gardner" timestamp="28:00">

Interesting, I guess what I was wondering was that the way that you have the equation constructed,
it introduces some sharp discontinuities in your reward surface, right? Because once you cross that
threshold in the entailment classifiers probability you dropped by a constant, no matter what. You
could imagine scaling like using the same Lambda as you computed it, but scaling it by the
entailment competence for instance. So it's a smoother reward surface. Does this make a difference?
Like I, I'm certain it what if you use like a gradient, like more probabilistic methods to do this
learning, but maybe it doesn't matter as much if you're doing reinforcement learning. I'm not
familiar with this as much.

</turn>


<turn speaker="Mohit Bansal" timestamp="28:39">

You'd write something like directly subtracting the entitlement value or we already, I mean we've
had a lot of scaling discussion. Like basically not even just scaling but also like this whole
concept of abrupt changes in the reward function. We had multiple discussion on that because that's
when the beginning, when we were just using entailment directly as a reward, that was also very
appropriate. We had this threshold, I think on whenever entailment is lower, we would use.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="29:11">

When our entailment is very low then we also considered some kind of adding entailment finally.

</turn>


<turn speaker="Mohit Bansal" timestamp="29:25">

Right? Yeah. We should send you all our previous versions of work, like one of these versions was
similar to what you're saying, where if entailment is lower than a very like 0.33 or something, then
the penalty is based on entailment because we thought, yeah, we don't want to use abrupt jumps in
the reward function, but at the end of the day, this simpler version seems to work the best.

</turn>


<turn speaker="Matt Gardner" timestamp="29:48">

That's interesting.

</turn>


<turn speaker="Mohit Bansal" timestamp="29:50">

Yeah. We could probably do more follow up on this.

</turn>


<turn speaker="Waleed Ammar" timestamp="29:53">

So another point I wanted to highlight, I mean it's not terribly surprising, but I think it's good
to emphasize here that when you add this reward function that's based on CIDEr or CIDEnt, you get
relatively large improvements in these two metrics. But you also get a little bit of improvement in
the other metrics, but not as much. And I was wondering, so that's kind of expected, right, because
that's what you're optimizing for. But I'm curious to know if because it seems from some parts of
the paper it seems like you tried also using the other metrics to define the reward function. And I
was curious to know if that made the bigger difference for the other metrics.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="30:38">

Yeah. So, we did try for other metrics as well. For example, we tried with BLEU, BLEU score has
better reward. And on top of that we added entailment to it, we called it BLEUnt. But the thing we
observed was when we add CIDEr as a reward we have seen improvements in CIDEr as well as other
metrics and as well as on human evaluation. But when we moved to BLEU reward a BLEU score was
improving. But overall the metrics were very low and as well as human evaluations were also very
low.

</turn>


<turn speaker="Mohit Bansal" timestamp="31:17">

Yeah, and actually first maybe before we go into BLEU, like what Waleed said about CIDEr. So
actually CIDEr is giving improvements on all the metrics. So you shouldn't look at the scale of the
improvement because that's what I was actually getting at earlier. CIDEr improvements are at a much
bigger scale usually. So to get statistical significance in CIDEr, you need around I think four to
5% jump. Whereas to get statistical significance in BLEU, you need around one percent. So all those
results, if you look at CIDEr like the last two rows of table two adding entailment, all the jumps
are statistically significant by p is, I think all of them are p less than 0.01.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="31:56">

Yeah. So for the CIDEr-PL apart from the metrics score, all of them are statistically significantly
p less than .001.

</turn>


<turn speaker="Mohit Bansal" timestamp="32:08">

So first I think CIDEr itself gives I think P less than 0.01, like, so if you compare the third last
and the second last rows so cross-entropy versus CIDEr-RL and then CIDEr-RL versus CIDEnt, that is
also statistically significant to note. But the scales of improvements vary a lot depending on what
metric you're looking at. Which is why we can't really use a weighted combination of the rewards as
a metric, as a reward. And then yeah, and then like the BLEU thing, what happened is that BLEU
itself, like Ram was saying, using Google as the reward itself was not able to show human evaluation
improvement. So like forget BLEUnt like even without any entailment idea just using BLEU itself as a
reward in video captioning was not a good fit.

</turn>


<turn speaker="Mohit Bansal" timestamp="32:58">

So that's what kind of you mentioned in section 6.3. So since because we can always play the game
where if you add a metric as a reward, then that metric improves and we were not interested in that.
Like Waleed said that's obvious. So when we added BLEU as a reward, we got BLEU improvements, but
then we said, okay, this might just be because you're using it as a reward. So let's take human
evaluation. So human evaluation showed that BLEU as a reward itself is not better than no reward so
then we didn't even try BLEUnt to fix BLEU. But BLEU itself doesn't work as a reward for video
captioning. So it might be specific to the task of video captioning. But I think even in image
captioning papers people prefer CIDEr.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="33:42">

They showed that CIDEr improves performance across all of the metrics then CIDEr received about ten
other metrics metrics.

</turn>


<turn speaker="Mohit Bansal" timestamp="33:48">

Okay. Yeah. And then tried some other metrics like SPICE, which is some new graph based metric which
also doesn't human evaluation and gave very long sentences. So any metric that as a baseline itself
was not being useful as a reward. We didn't try to correct it using entailment because there's no
point because the metric itself is not a good fit for the task. So that's why did that, because
CIDEr was not just playing the game of like improving itself because you're using it as a reward. It
actually improves statistically like big margins, all metrics and then adding entailment to it again
for this significant improvement.

</turn>


<turn speaker="Matt Gardner" timestamp="34:29">

So I remember the introduction of the METEOR metric and one of his goals was to handle paraphrase
kinds of issues and that seems like a very similar thing at least in the examples that you showed to
what you're doing with this entailment metric. Does this comparison make sense? Like you in your
examples for where you get high CIDEr scores, but low entailment is where you get a man is cutting
the meat versus a man is cutting meat into potato. I mean, maybe the better example is right below
it, a dog is jumping in the snow. A dog is jumping in cucumbers. So something that looks at whether
snow and cucumbers or paraphrases should handle roughly the same kind of thing.

</turn>


<turn speaker="Mohit Bansal" timestamp="35:17">

I think it is the word effect. So it can look, it can handle things where it should get credited,
but BLEU is not giving it credit. But these are cases where it should not get credit. But we do
still have a high score, right, because the rest of the phrase would still match. So I think that's
the important logical, like the directionality distinction that it will still not be able to handle
contradiction cases, which is what we are doing. So it will be better at paraphrasing if you give
credit when it deserves credit, but it will give credit. But it also doesn't deserve credit logical,
directed constraint.

</turn>


<turn speaker="Matt Gardner" timestamp="35:50">

So if we modified METEOR to more strongly penalize things that are not paraphrases would we get
roughly the same kind of benefit.

</turn>


<turn speaker="Mohit Bansal" timestamp="35:58">

Yeah. So we tried METEOR and I think what was [inaudible] it's the slowest possible metric
calculation, which makes sense because as soon as you introduce dictionaries and tables and synonym
lookup to something, whereas if you'd want to use anything as a reward in such setups, the metric
calculation has to be extremely fast. Otherwise, I think using METEOR as a reward can take like 10
times more time as an experiment than using GLEU or CIDEr.

</turn>


<turn speaker="Matt Gardner" timestamp="36:28">

But what about the entailment? You're running an entailment classifier on two sentences. Is that
also slow?

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="36:34">

No, no, that is pretty fast.

</turn>


<turn speaker="Mohit Bansal" timestamp="36:35">

I think it changed the experiment time by what, 20% like one hour versus one hour, 10 minutes?
[Inaudible] Yeah. So I guess the trick is that we used a very simple model like the Google
decomposable attention entailment classifier but I mean you can use there is even faster ones. I
guess. We had a very simple model recently in the shared tasks, the MNLI shared tasks on this
stacked encoders with maxpooling.

</turn>


<turn speaker="Matt Gardner" timestamp="37:04">

The reason that I asked particularly about paraphrases is because that model is known. Like it only
looks at word comparisons. That's all I can do literally. And so basically you're getting
paraphrased information as a proxy for entailment. Right. And so it's interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="37:20">

So, okay, my last question here is do you think this would help for machine translation or other
kinds of sequenced generation tasks? So machine translation is also trained typically on cross-
entropy or optimizing BLEU in some kind of policy gradient dish thing. Would adding an entailment
thing help here, do you think?

</turn>


<turn speaker="Mohit Bansal" timestamp="37:42">

Yeah, sure. I mean, yeah. So when I was giving this talk at Johns Hopkins, I think since as you
know, they have a lot of MT people there. I think those are definitely interested in trying this in
MT, we've been trying this on summarization with good results and hopefully a paper coming up soon.
So in summarization this does help like it has the same issue, right? Some generated summaries have
studious contradictory information which ROUGE and other phrase matching metrics can catch. But if
you ensure that the generator summary has to be a logically director entailment of the conference,
and of the document then this helps strongly, but machine translation. Yeah. I guess we just, since
we are not MT people, we are, yeah, we are definitely up for like talking to MT people and
collaborating and like sharing stuff.

</turn>


<turn speaker="Mohit Bansal" timestamp="38:37">

But I think the same issues or I mean in some sense it might be slightly different because machine
translation is more constrained. You're going from text to text and you, it's very different from
image or video to text where there's a lot of extra information in the video or also from document
to summary where there's a lot of extra information in the document where logical entertainment is
then even more important. But machine translation is a little bit, not a little bit, it's a pretty
different tasks in terms of the input and the output are exactly the same semantic content and
meaning in different languages. So it might, things might play slightly different. we haven't
explored that here.

</turn>


<turn speaker="Matt Gardner" timestamp="39:19">

Except the entailment only operates on the output of the decoder and on the ground truth output. So
it seems like it should be just as a applicable.

</turn>


<turn speaker="Mohit Bansal" timestamp="39:28">

Yeah. So in summarization we are looking at both entailment with the input document and with the
ground truth summary. But yeah, if you are just sticking to entailment between ground-truth output
and generated output, then I think it should still be able to correct some of these bugs where the
generated translation seriously adds some extra or contradictory information that BLEU is not able
to cathc. But in the machine translation community, has there already been a lot of like metric
level reward models?

</turn>


<turn speaker="Matt Gardner" timestamp="40:00">

I think so, but I don't follow that work very much.

</turn>


<turn speaker="Mohit Bansal" timestamp="40:04">

Same here. We don't follow it, we should follow it.

</turn>


<turn speaker="Matt Gardner" timestamp="40:08">

This actually just made me think a lot more. Another connection, so there there's this work
originally at least the first place I saw it was in image classification, but we also recently saw
it in a language modeling paper where you change, you modify your loss function to include a
similarity between the word embedding of the target output word and the actual output word like,
your output distribution. Does this make sense? So you don't penalize producing cat. Like if your
target is dog, you don't penalize cat as much as you as you penalize the for instance. And you could
have like because again, your entailment model is really looking at paraphrase information and word
substitution. You could imagine that a modified loss function that just uses word similarity and
penalizes it if there's, if there's very strong negative similarity in some sense you'd get much the
same kind of information.

</turn>


<turn speaker="Mohit Bansal" timestamp="41:16">

Yeah. So I think one of the followups we are doing is related in the sense that we are trying to
also combine a paraphrase with entertainment information because you still feel it's complimentary,
especially given the current paraphrase models. We did a lot of work on paraphrase detection when I
was at TTI. And from what I recollect the paraphrase models are still pretty kind of there's still
issues in terms of predicting negations or things that almost look like paraphrases but have
external contradictory information. So I think these are complimentary. Like we have we are trying a
new loss function where it's both looking at bi-directional entailment like entailment logical
checks in both directions and mixing paraphrase checks with it, because not because if this was
perfect, then if they would be partly complimentary, but given the current state-of-the-art
paraphrasing models and entailment models, they do capture complimentary, different information
because there's been studies where paraphrase models are still not able to detect subtle kind of
insertions or deletions or negations. Right. at least back when I look, last. So the still
complimentary information there.

</turn>


<turn speaker="Matt Gardner" timestamp="42:29">

Right.

</turn>


<turn speaker="Mohit Bansal" timestamp="42:30">

And then another thing that might be important here. I guess maybe we're out of time, but one other
important thing here is the point on, what was I gonna say? Oh yeah. The mixer versus a mixed-RL
thing was also important in the paper. I think we have it somewhere. Yeah. So maybe you can
[Inaudible],

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="42:53">

So initially we tried with the mixer approach that was ICLR 2016 paper
(https://arxiv.org/pdf/1511.06732.pdf). So then the problem with a mixer approach was when we have
no constraint on the language model side these these metrics can gain to improve the reward that it
is optimizing. So when we checked the output example, even the score said pretty good, when we
checked the examples. Some of them are grammatical incorrect or not that good, readability wise they
are not good. So then we use dthe mixer loss. Where we have both losses our reinforcement loss and
mixing loss reinforcement loss and cross entropy loss both together. Then this cross-entropy loss
will try to keep the language structure still improving the metric through the reinforcement loss.

</turn>


<turn speaker="Mohit Bansal" timestamp="43:59">

Yeah. So this is an important maybe last note, what people trying to do a sequence level training,
like it's a little bit tricky to get it to work where you do, like the model might start gaming the
thing where it's just trying to choose and delete words that keep the metric happy. I mean, if you
set a very high bar that you'll only be happy if all your metrics improve statistically, then you
won't have this issue. But if in general when you have initial experiments, you'll see that if you
just use the RL loss then it can just learn to delete and add words as that particular metric that
you're using as a reward gets better. But then if you use ML plus RL with a weighted combination in
the loss, like the cross entropy loss and the RL loss, then it makes sure that you're also keeping
fluency and the language model happy. And then I guess Ram you started with ML cross entropy loss
and then kind of be in the good part of the search space, and then you anneal towards ML plus RL
[inaudible]

</turn>


<turn speaker="Waleed Ammar" timestamp="45:07">

Yeah. I was kind of surprised that this, that you had this effect given that with the reinforce
formulation, the two loss functions are not actually very different they are just like a scaled
version of like you know, when you were talking about the the cross entropy all the gradients are
kind of multiplied by one, but when you add the RL loss you've kind of waiting every sentence by the
reward you get for it. So they're not very different, but maybe, what we're getting here is a
smoothing effect for the rewards because maybe the rewards are very rough at the beginning and they
don't make much sense.

</turn>


<turn speaker="Mohit Bansal" timestamp="45:46">

Right. So if you directly have RL loss in the beginning, then I don't, [inaudible] it will never
even converge. So basically the ML loss makes sure that you are in the right part of the space with
the cross entropy predictions. And then you also don't jump from full ML to full RL. You have to
keep ML plus RL with some specific weight in between them.

</turn>


<turn speaker="Waleed Ammar" timestamp="46:09">

That's interesting. Yeah. In general, I feel like I'm pretty, I'm excited that we can get this level
of performance for video captioning. A few years ago I would imagine this to be like a sci-fi thing.

</turn>


<turn speaker="Mohit Bansal" timestamp="46:24">

Yeah. We were actually, I think given that ACL like multitask papers, improvements and this one we
released their demo NIPS, which we should hopefully make public soon. We just need a free GPU to
keep it alive all the time. But basically when we were playing with this demo, like I was joking
with the RAM and the undergrad who works on this that I showed like this is not from like
accidentally from the training data or something. Like the example he was showing me because he sets
up the demos. I don't even click on any YouTube link randomly and it will, and it's very fast, like
badly process frames. I think in like three seconds or two seconds, it can generate a nice caption
for any random clip. And we have this interactive length approach where you can keep generating
longer and longer captions for subsequent clips by using redundancy checks that you only add a
caption sentence if it's very different from all three of the sentences that are generated. So all
of this like was very interesting and surprising to me too. Like I felt like maybe like a video
captioning has crossed certain threshold of goodness in terms of actually being useful, hopefully
pretty soon.

</turn>


<turn speaker="Waleed Ammar" timestamp="47:31">

Yeah. All right. Thank you very much for joining us for this recording

</turn>


<turn speaker="Mohit Bansal" timestamp="47:36">

Thanks for inviting us it was fun.

</turn>


<turn speaker="Ramakanth Pasunuru" timestamp="47:38">

Thank you.

</turn>
