---
title: "Multi-modal transformers, with Mohit Bansal and Hao Tan"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Hao Tan","Mohit Banal"]
number: "107"
tags: []
description: "In this episode, we invite Hao Tan and Mohit Bansal to talk about multi-modal training of transformers, focusing in particular on their EMNLP 2019 paper that introduced LXMERT, a vision+language transformer. We spend the first third of the episode talking about why you might want to have multi-modal representations. We then move to the specifics of LXMERT, including the model structure, the losses that are used to encourage cross-modal representations, and the data that is used. Along the way, we mention latent alignments between images and captions, the granularity of captions, and machine translation even comes up a few times. We conclude with some speculation on the future of multi-modal representations. Hao's website: http://www.cs.unc.edu/~airsplay/ Mohit's website: http://www.cs.unc.edu/~mbansal/ LXMERT paper: https://www.aclweb.org/anthology/D19-1514/"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Ammar and Predeep Dasigi.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:08">

Hello everyone. Today we are going to talk about Learning Cross-Modality Encoder Representations
from Transformers . Particularly we're looking at LXMERT, the model which was published EMNLP last
year and for this episode we've invited Mohit Bansal and Hao Tan from UNC Chapel Hill to join us
welcome to the program Mohit and Hao

</turn>


<turn speaker="Mohit Banal" timestamp="00:28">

Thanks, thanks for having us.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:30">

So can you start us off by telling us, what exactly is the idea behind learning cross-modal
representations and what you were doing in your paper?

</turn>


<turn speaker="Hao Tan" timestamp="00:38">

Yeah. In this paper we want to build a joint representation of the cross-modal inputs such as a
ResNet model on the ImageNet and the BERT model pre-trained on a large amount of tasks and the
motivation behind it is that if we just use the uni-model representation such as the ResNet and
BERT, they actually did not work very well on cross-modality tasks. I think the main reason behind
this is that the two kind of features, the language feature and the vision features, they are not
really aligned with each other. So what we want to have in this work is to have pre-trained features
for the cross-modality tasks and the cross-modality includes it's image and a sentence in details.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="01:22">

Okay. can you give us some examples of what kinds of tasks you think these models would help?

</turn>


<turn speaker="Hao Tan" timestamp="01:28">

Yeah. For example, I think the main task is a visual question/answering that we take a image and the
question as a input and the question is related to the image and we want to predict the answer such
as there is a image in the, it's a room and we want to ask what is the color, it's a chair. In this
case we want to predicted the answer of the color, maybe it's blue. If it's a chair is blue. And in
this case we need to understand where the chair is in the image and what color of the chair is. It
needs the grounding of the object "chair" and they also need to have the property of the object
chair in the image.

</turn>


<turn speaker="Matt Gardner" timestamp="02:13">

I think we could be even a little bit more specific and more general than this. So if you think
about a dataset, so there's GQA grounded question answering and NLVR2 a dataset, natural language
visual reasoning. So these are, as you said, visual question/answering datasets. Some specific
examples where you might expect the like some pre-trained transformer or cross-modal transformer
might help. Like "chair" seems common enough that it's not a huge deal. But let's, let's take
something like "glass beer bottles" and contrast that with like "wine glasses" where maybe the words
here are kind of similar but they're visually pretty different and they're in some sense long tail.
Like, I'm not going to see a whole lot of examples of in my training data probably for any
particular task. But BERT you would think knows some correspondences and some differences between
these, maybe not their visual manifestation, but at least it will know some kind of correspondence
here. And so perhaps you can get some leverage out of using some pre-trained language
representations to do better alignment on long tail image phenomena. More specifically, this is I
think where you probably would expect to see help.

</turn>


<turn speaker="Mohit Banal" timestamp="03:27">

I think Hao had a good example in one of our emails, like maybe Hao remembers a couple of months ago
he had some nice visual versus textual clusters. So basically in something like BERT or just textual
GLOVE things like lipstick and sunglasses would be clustered more closely to each other because they
are both related to the topic of fashion, the textual topic. Whereas on the visual side, lipstick
would be more close to something like a cigarette lighter, especially they are more close to ones
mouth. Is that Hao a good example?

</turn>


<turn speaker="Hao Tan" timestamp="04:00">

Yeah, I think it's a good example, and I think I currently think it's using the language
representation to solves a long tail problem. It's still very challenging because actually what I
found that, as Mohit just said that actually if you were just to take the UN model we are pre-
training, the representation of the word embedding the vision pre-training and the language pre-
training. They are very different to each other. In details because the language pre-training is
contextual pre-training like we want to predict the words from its context and the visual
pre=training is actually something like this semantic pre-training or something like this. It
actually predicts what happens in the image I will give an example here. Like the word "left" and
"right" actually they would have exactly the same capacity, most of the language. Whereas you could
put the word "left" here. You could also put the word "right" here. The embedding for the word left
and right. They would be almost the same, but the cross-embedding , they would be very different to
each other. Actually "left" and the "right" is the opposite in the vision embedding, but the other
close to the embedding the language embedding.

</turn>


<turn speaker="Matt Gardner" timestamp="05:07">

Yeah. This is a really good point. The overall motivation for this cross-modal representation. I
think this is a really great example that you get very different information from both. And you
started by talking about motivation on the image side, and we've talked about some specific examples
there, but I think also, I don't think this is really what you were targeting with this paper, but
you would expect in the long term when we figure this out in some sense that the multi-modal
representation should help us even on the language side for language only tasks. So that's like a
long-term goal of this whole area, right?

</turn>


<turn speaker="Hao Tan" timestamp="05:41">

Yeah, I think so. I think it's a general goal of our project.

</turn>


<turn speaker="Mohit Banal" timestamp="05:44">

Something also clicked something in my head is that five or six years ago we had this paper and in
CVPR 2014 when we were trying to basically what Matt's trying to says, yes, we would like to take
ambiguities that are ambiguous just with text alone, and hopefully be able to resolve these
ambiguities with grounding and some other modality, people have shown that grounding could be in
speech, it could be in vision, it could be in robotic actions, right? So this is exactly where we
should hopefully converge to, but there's also older work, so not just ours, but one example is CVPR
2014 where we tried to do co-reference ambiguity's for example resolving co-reference ambiguities by
doing the real definition of grounding. If two phrases in the caption sort of pointed to the same 3D
cuboid in the 3D image, then that would be the real definition of co-reference. Then our
collaborators from now in Georgia Tech, Devi (Parikh) and Dhruv (Batra). They also did this thing
for the parsing side of things where we have propositional attachment ambiguities and they use the
vision features to be able to solve that ambiguity. So it's also would be great to connect it back
to those kinds of examples.

</turn>


<turn speaker="Matt Gardner" timestamp="06:49">

Yeah. And one more that I feel like I have to mention just cause it's really interesting. Also you
can ground it to other languages in like machine translation. So you get like multi-lingual kinds of
embeddings that can help resolve certain kinds of ambiguitys.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="07:04">

Okay. Yeah. Coming back to the specifics of the model. So you have this vision side of things and
the language side of things and you have embedding layers and encoding layers on these two
modalities, right? So some of these methods might be hard to talk about without actually showing
images, which you do a very good job in your paper, but let's try to do our best for the embedding
side of things. Can you describe that part of, so the language is essentially as the word piece
encoder, right? Like many other transform models. Can you talk about the vision side of things in
more details please?

</turn>


<turn speaker="Hao Tan" timestamp="07:37">

Yeah, sure. So for the language embedding. It's just a sequence of word and the with this positional
embedding and the in the vision side, we just don't want to do almost the same thing. But the
challenge here is that the visual input is an image. So an image is naturally a two dimensional
array that you have heat and wise. So what we want to do is that we want first a convert it to a
sequence of features and, it also have features. And in the idea of features and the positional
embeddings just as a language path. The tools we used here is the objective feature that is
objective data tries to detect some meaningful object in the image is just some rectangles on the
image which compares to some meaningful objects, labels or something like this like chairs, tables,
televisions, something like this. Then we just use this object as the input of the feature so it
would be a sequence and it would also have the positions for it. The position is the coordinates of
the path, the rectangles, so this is a general idea of of the vision embedding.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="08:39">

I see. Okay. I'm not familiar with image embeddings in general because I've not done work in this
area. Is this, is this a common way of doing this? Are there other works that do something similar
as well?

</turn>


<turn speaker="Hao Tan" timestamp="08:49">

On the vision side, I think the embedding the vision embedding, they are more likely to use the grid
embedding, grid embedding is just you have a image and the you convert it to a feature map is a
still a two dimensional feature map and each feature is corresponding to a small patch of the image.
So it is consequently feature but on the vision, the language, I think objective tactic currently
can become a dominate pre-processing.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="09:14">

Okay, thanks. That makes sense. So that's how you embed your inputs on word division and the
language side. Can you talk about the encoders now please?

</turn>


<turn speaker="Hao Tan" timestamp="09:24">

So for the encoders because currently the language and the vision input, the output a sequence of
vectors. So what we could do that for the vision side that we have a visual encoder is that it maybe
first on the language side is a language encoder is just the same as a BERT. It's a transformer
blocks and on the vision side because currently the input is a sequence of objects. So we could also
apply a transformer blocks here. So we call it the visual encoder and then on top of them. We want
to fuse the information from the vision language together. So we have some cross modality of
transformers. So it, it's built with cross modal attention blocks instead of self attention blocks.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="10:08">

Okay. And is your paper the first one to introduce cross attention?

</turn>


<turn speaker="Hao Tan" timestamp="10:12">

No, actually not. I think the cross attention is an old idea. It's used in vision language task and
is also used in summarization as a texture. It's also using the BiDAF model to handle the reading
comprehension

</turn>


<turn speaker="Pradeep Dasigi" timestamp="10:28">

Of course. Yeah, that makes sense. Yeah, indeed. I mean this is very similar to the BiDAF idea.
Okay.

</turn>


<turn speaker="Hao Tan" timestamp="10:33">

I think we we as the first paper two stacks, they said tennis cross 10, so many layers to build high
level representation of the connections.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="10:43">

Okay. Alright. Yeah. So you have a self-attention on in this uni-model encoders i mean, you have two
uni-model encoders in two cross-model-encoders. And you have self-attention in both these uni-model-
encoders and the cross-modernity encoders have cross-attention followed by another layer of self-
attention. Correct. So what exactly is this, I mean, why do you this additional layer of self
encoders across attention?

</turn>


<turn speaker="Hao Tan" timestamp="11:10">

I think it has two explanations. The first one is that it's very similar to the BERT layer. The self
attention layer is almost same to the encoder of the transformer and the cross-modality is very
similar to the actually similar to the decoder of the transformer. So the first have a cross-
attention layer, the decoder transformer would first have a cross-attention layer, attend to say
output of the encoders and then it would have a self-attention layer. So we actually use the same
architecture here. We first have a cross-attention attend to the other modality and then we have a
self-attention layer but we could consider it as a two transform encoders in parallel and the other
explanation is that it is very similar to the BiDAF model. In BiDAF model, you would first have a
cross attention layer and then you would have a LSTM model layer to process the fused information
better. So the self-attentions is in replace of this modeling LSTM layer.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="12:07">

Cool. Yeah, that makes sense. And your models have three outputs, correct? You take three bits of
information from the combination of these encoders can you describe them?

</turn>


<turn speaker="Hao Tan" timestamp="12:17">

Yeah. The three input is joint representation. It's just a single vector, so the language and visual
they are the sequence of vectors, so the joint representation is very similar to the ResNet
features, so it's just a one is a single vector which in representation of the whole image and the
sentence and the language output is a sequence of vectors its very similar to the BERT outputs that
each vector is corresponding to a word token and the the objects on the vision side is also a
sequence of vector and each vector is corresponding to an object. The only difference is that for
here for each language output. We also take the vision side into consideration. Just the encoded the
language side. Okay.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="13:06">

The you have this cross modality output which use output of the encoding of the CLS token that I
think covers the details of the model. Let's talk about the pre-training tasks and how you pre-train
your model. You describe five pre-training tasks in your paper can you go over Them? I have a few
questions about some of the tasks.

</turn>


<turn speaker="Hao Tan" timestamp="13:25">

Yeah, thank you. So the five tasks is grouped into three different types. The first is the language
task. The second is the vision task and third is cross-modality tasks. So for the language task it's
just the masked language model same as BERT and for the vision side, it's in general, the mask-
objective prediction. We mask some objective from the input and we try to predict the masked object
from the input. And we have two sub-tasks here. Actually we have two different kinds of loss here.
The first one is that we want to predict the feature of the masked object. And the second one we
want to predict the label of the masked object such as whether it is a dog or a cat or something
like this. So for the third group it also have two sub-tasks. The first one is cross-modality
matching that we want to measure whether sentence align is aligned with the images or not. And the
last sub-task is a visual question answering. So because we also use the question as a part of the
dataset. So if the sentence is actually a question we just want to answer the question, answer
vision related questions.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="14:40">

So you have two object recognition pre-training tasks, right? One where you retrieve the features of
the objects and the other is where you predict the labels, right? What exactly is the intuition
behind having these two different tasks and what is the model expected to learn differently from
these tasks?

</turn>


<turn speaker="Hao Tan" timestamp="14:59">

Yeah, I think that the motivation is that we want the model capture both high level information and
the low level information. So the low level information is captured by the feature regression that
they will just just want to regress to the 1048 dimensional test feature of the ResNet. So it would
capture the information such as a color and a texture of the objects and the classification we want
to capture is the high level information. Like whither the object a dog or cats or something like
this. So this is used to capture, two kinds of information.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="15:33">

Do you actually see that the way the model learns is different for these two tasks and so you
discover an intuition. Did you actually see that in your results as well?

</turn>


<turn speaker="Hao Tan" timestamp="15:42">

Hmm, I think I could observe that because I just tested the help of the language help of the feature
regression on top of the object detection and if I add feature regression, I could find that
something like whither it above the detailed picture of the image some questions about the detailed
texture of the objects could be answered, like, but is this is just a collectively and best guess. I
didn't have the quantitative results for it.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="16:10">

Okay.

</turn>


<turn speaker="Matt Gardner" timestamp="16:11">

Is it fair to say that the feature regression task is basically trying to do model distillation of
the original object detector that was trained? Is that fair?

</turn>


<turn speaker="Hao Tan" timestamp="16:24">

Let me say. I think it's a little bit different. It's more like auto encoder. Like I want to recover
the input from the output.

</turn>


<turn speaker="Matt Gardner" timestamp="16:32">

Oh, okay. So you get as input the feature representations from the pre-trained ResNet or whatever.
And then you do some encoding and then you try to recover those same features. So you're not taking
the original pixels and producing the feature representations that would be modeled distillation.
You're doing something much more like auto encoding as you say, which is like I take my features, I
compress them or rejigger them in some way and then try to predict them again. Okay. Got it.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="17:00">

So okay, to summarize, you have five pre-training tasks, three of them are uni-model, one is for
language and two are for division tasks and two are cross-model tasks. Right. So what data sets do
you use for pre-training the model?

</turn>


<turn speaker="Hao Tan" timestamp="17:16">

We generally use five datasets and it's grouped into categories. The first category is the caption
data set and second category is visual question and answering dataset. And in the first group we
have is a MS COCO captioning dataset and visual chain in the caption dataset. For the second group,
we have three image question and answering datasets the first one is VQA the second one is GQA and
the third one is VG-QA. So in total five different datasets.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="17:46">

Okay. That's something I thought was strange about using both image captioning and VQA datasets for
pre-training cross model transformers. Right? So in VQA datasets essentially because these are
question, there's some key information missing in these statements, right? Because they are
questions but image captions are essentially descriptions of the image, right? So did you actually
have to deal with that difference between these two sources of data or did you just pretrain them
anyway?

</turn>


<turn speaker="Hao Tan" timestamp="18:16">

Yeah, it's a good question. We actually consider them as a same because we want to build a universal
representation for the image and it's sentence. And the reason is that we actually want to build a
ground connection between the sentence and the image. So the key missing component here is the
grounding pad that we want to know which word is corresponding to which part of the image. In this
the only thing we need is that the sentence is related to the image. We don't need the sentence
fully describing the image. So as I think the question is do the image relative sentence. And one
more thing I want to mention is that actually the captioning is not, is still partially describing
of the image is not fully described everything in the image because in the caption you would just
highlight some most important things in the image. "A cat will sit on a chair." We will not mention
the tables, the television or something like this.

</turn>


<turn speaker="Mohit Banal" timestamp="19:10">

Yes. I think it's almost like a sort of a spectrum issue, right? So a caption can be actually less
detailed than a visual question/answering question sometimes and vice versa. A question could be
more detailed even though it's asking what the third thing, but it was still mentioned who thinks
about the image while asking about the third thing. So in general I think that's what all you're
doing. I mean there might be some, future experiment here to see if we can word the VQA questions
plus answers to more like statements. Maybe there is some advantage to that because now it's exactly
similar to captioning.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="19:46">

Yeah, these are good points. Is there room for doing something like trying to find the specific
regions of the image that the questions are the captions are talking about and only use that for the
image for pre-training your cross model transformers because that's what you're more interested in.
Right. Would something like that make more sense.

</turn>


<turn speaker="Mohit Banal" timestamp="20:05">

These are very small data sets. So like if you look at the CVPR again, the six year old paper, we
had like a very small dataset on 3D rooms and like aligning the sentence to cuboids and then Julia
Hockenmaier and her student had like a slightly bigger version of this? A very useful paper. I think
it's a very good way to supervise your tension layers also, as far as we know, there's not very good
datasets that exists for this.

</turn>


<turn speaker="Matt Gardner" timestamp="20:28">

I'm really not familiar with this work so you'll have to fill in some stuff here. But you could
imagine like a latent alignment model. The just embraces the fact that as you say, you're always
going to get a very incomplete description of the image that you're looking at and like tries to
detect, I don't know, at level of depth. You're like showing stuff. Like I could describe a bird. I
could say like what species it is. I could say it's a bird. I can say it's an animal. I could, I
could give specific descriptions of like the feather patterns or, or like the color of the beak and
all of these should like ground very differently and have like different alignments between the
parts of the image and the question. And like you could imagine having some latent alignment model
that tries to be intelligent about this.

</turn>


<turn speaker="Mohit Banal" timestamp="21:14">

It sounds also related to curriculum learning where you could be going from like simpler to longer
sentences. You can also define the notion of like specificity in images and captions where they
basically, there's a way to calculate how specific or, how, like you said, how deep the description
is. So yeah, I could see this happening both as a sort of input feature additional features scenario
or as learning it latently, or revising the input signal latently.

</turn>


<turn speaker="Matt Gardner" timestamp="21:42">

So I didn't catch all the details of the CVPR work you were talking about earlier. Is this like, are
there models that have like explicit latent variables and try to do some kind of like EM and like
figure out what the alignment is and use this to do better training?

</turn>


<turn speaker="Mohit Banal" timestamp="21:56">

The CVPR 14 paper with my Chicago TTI collaborators who moved to Toronto since then, Raquel Urtasun,
Sanja Fidler. That was right before sort of our deep learning took over. So this was a big factor
graph with belief propagation and trying to learn all the 3D cuboid and phrases on the caption side,
their connections latently..

</turn>


<turn speaker="Pradeep Dasigi" timestamp="22:17">

Okay. Another related question is whether this the datasets that you used for pre-training. If they
do have multiple questions per image, how will you be able to leverage all of them at the same time?

</turn>


<turn speaker="Hao Tan" timestamp="22:28">

Actually in the data set actually each image is corresponding to multiple captions and multiple
questions. So we just use each pair as a single training instance.

</turn>


<turn speaker="Mohit Banal" timestamp="22:38">

I think the question is do you think the, I mean obviously are you treated those that independently?
Do you think, I mean there's work that takes multiple references, a generation tasks and also tries
to not just use their for reference but during training, right? These belong to the same instance.
So I think the question might be similar if you know that these four questions come from the same
image and you somehow get better training by telling your model that you [inaudible]. It depends on
what, like if it's like machine translation style references, then they'll probably just paraphrases
of saying the same thing. But if it's more like four different captions of this image that are
trying to cover different aspects of the image, then it's much more interesting probably because
then it's sort of making sure that you're, it's a coverage issue so you could actually have a loss
function that makes sure that across these four captions we have covered for all parts of the image
as opposed to like it wouldn't be about redundancy, it would be about coverage.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="23:31">

Yeah. Well captions are generally expected to describe the whole image probably right.

</turn>


<turn speaker="Mohit Banal" timestamp="23:36">

Paraphrase sort of references. Maybe but if you use datasets, like the dense captioning datasets
from Stanford, which we've used for some papers, they are more about basically going through each
part of the image and densely describing a whole paragraph about each aspect of the image. So that
we haven't really looked into so far.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="23:54">

Okay. Cool. All right. And another question I had about the datasets you used, did you treat all of
them similarly or did you like preprocessed them differently or make the model aware of which pre-
training tasks or which pre-training datasets that you're using for these tasks?

</turn>


<turn speaker="Hao Tan" timestamp="24:10">

Yeah, we didn't do any special or preprocessing on each dataset. I think the only thing we did was
that we cut off the over-length sentences, and cut it at a threshold of 20. Because we want to have
a fixed lens input for the model we didn't do any other additional pre-processing and we treat all
the datasets at the same, we treat the questions and the captions all as sentences which is related
to the image.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="24:37">

Yeah. Okay. Yeah, that makes sense. So let's talk about the fine tuning parts of your model
training. So in your paper you also to fine tune on this some visual question/answering tasks.
Right. And I was curious if there was any overlap in the visual question/answering datasets used for
pre-training and fine tuning.

</turn>


<turn speaker="Hao Tan" timestamp="24:56">

Actually they are overlapping. I think this is more, the pre-training is more like a masked task
pre-training. We actually pre-trained on the masked language model and the mask object prediction
and we also pre-trained on the visual question/answering task in the and for the fine-tuning, we
also [did] fine-tuning on the visual question answering task but the actually a little bit different
in the Pre-training we mask the word and the object in the question and then left the model to
predict an answer. But in the fine tuning we just gives the sentence and the objects. So they are
different input.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="25:28">

And also for when you using visual question/answering, can you describe to us the main experiments,
the main fine tuning experiments that you performed for your paper?

</turn>


<turn speaker="Hao Tan" timestamp="25:39">

Yeah, so we mainly fine tuned on three different datasets. The first one is VQA and second one is
GQA and the third one is NLVR2. So maybe I just described the VQA because it turns out the dataset
is almost the same. So for the VQA we just take the pre-trianed LXMERT model and fine tune it maybe
find new applicable answers on the VQA dataset and we use a very small batch size is 32 batch size.
And as a result is much higher than the previous work and the in fine tuning VQA dataset we did not
take additional data on the vision because in previous work in fine tuning on the VQA dataset, we
usually use additional VGQA and visual dialogue data set as data augmentation but because without
pre-training the model already has a very good representation of the cross-modalities. So we did not
take this kind of data augmentation.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="26:34">

Okay. Yeah, so I did notice that you have lots of experiments in your paper and there were lots of
different classes of results that we can go over. That's all really exciting. Can you start by
describing what the general high level trends are in these results?

</turn>


<turn speaker="Hao Tan" timestamp="26:47">

Yeah, the general trend is that I think the first one is the scalability that we have more layers,
more data and moe training steps. The result would be better. This is the first observation and the
second observation is that all the pre-training tasks helps a lot. We have some applications that
they are all five pre-tasks and we found that every pre-trained tasks contribute to the final
results.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:10">

Okay. And can you give us a quick summary of the numbers here, how you did mention that LXMERT fine
tune did much better than the previous quarters. Can you do a quick summary of those results?

</turn>


<turn speaker="Hao Tan" timestamp="27:21">

On the VQA dataset, we actually have 1.5 points on the accuracy, which outperforms all previous work
and the VQA dataset 0.5 incriminating accuracy is considered as a significant improvement, so we
have a large jump here and on the GQA dataset because last year is the first time when GQA released
and then we attended the GQA challenge and the we got first place if we use the standard feature, we
improve as a previous best results by around 15 points in accuracy. So it's a very large jump
[inaudible] we also get the first place on visvis.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:57">

And you also have lots of interesting analysis on your results in your paper. Let's look at that. So
the first bit of analysis you did was comparing LXMERT with some forms of augmented visually
augmented BERT. Can you please describe to us that analysis?

</turn>


<turn speaker="Hao Tan" timestamp="28:13">

Yeah. We actually tried two different ways to use BERT the first is that we that we do actually
loads the BERT within LXMERT and the fine tuning downstream tasks like VQA on NLVR2 . And the second
set up is that the we load BERT within to pre-training. And what we actually use that we did not
immediately try is with BERT and the just do pre-training and we found that our configuration that
did not load BERT got the faster results and if we directly load in BERT it's actually broken on
certain area to dataset. We still consider what happens here. But we did not get a clear answer why.
The major is that we think that it may be the language representation and the visual representation
are very different from each other. So it's very hard to make algorithms to have a joint
representation.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="29:02">

I see, yeah. Yeah. Any further analysis along that line would be quite interesting. I think it's
very interesting with that initial work with BERT didn't really help. And I was wondering if going
in the other direction would help as well. I mean that's, I know that's not like the main point of
your paper anyway, but if you say you took pre-trained LXMERT and use that or use at some of those
ways to at least initialize a BERT like model, which is purely a language modality, do you think
that would help?

</turn>


<turn speaker="Hao Tan" timestamp="29:28">

Yeah, we have some initial [inaudible] and we've found that they then have to match because I think
the main reason is that BERT is pre-trained on a very, very large corpus. It has three billion
tokens our LXMERT is only trained on a small data set, it has around a hundred million tokens, so
it's around 30 times less than the BERT pre-trained so it does not cover a large range of linguistic
phenomenon and I think it's so it does not work. We aren't a pure language tests, but we are
[inaudible].

</turn>


<turn speaker="Matt Gardner" timestamp="30:01">

Yeah. I guess my intuition here is that we need better evaluations to really show the gains from
these things. If our current datasets are largely I-ID trained test datasets, these large models
with lots of data, will memorize distributions and and, and largely fail to generalize off of the
distribution that we give it. And we need better evaluations that will actually test this stuff
before, for instance, the vision and language pre-training will actually help on language only
tasks. We don't, we don't have good enough tests anywhere to actually evaluate this and someone
needs to make some before we'll actually see gains from doing this kind of thing.

</turn>


<turn speaker="Mohit Banal" timestamp="30:47">

I guess even for a vision and language tasks, having a better benchmarks for out of domain
generalization testing where if someone like could be clearly like very concretely checking for the
I-ID need distribution differences that you mentioned would also be very useful.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="31:03">

Right. So before we conclude this discussion, I want to do ask you if you could summarize the
similarities and the differences between LXMERT and many of the other multi-modal transfer papers
that were pretty much contemporary that came out at the same time. Right. Could you please tell us
what you think are the similarities and the differences between your model and those models?

</turn>


<turn speaker="Hao Tan" timestamp="31:26">

I think the most of the works differ in all three aspects. The dataset, the pre-trained dataset and
the model and the pre-trained method, so I would take the time to compare work so I will take two
works, VilBERT and Visual BERT as an example. So for VilBERT it's pre-trainend on the conceptual
captions. It's a large data set provided by Google from the internet captioning dataset and so that
dataset is 30 times larger. The images and date also pose a more than passive the via birthday. It
does not have the visual encoder and for the pre-trained method it does not have the feature
regression and for the impediment date details. It also differs a lot in the code and something like
this and so for the visual BERT. It only used the MS-Google dataset as it's pre-trained dataset, so
it's a smaller dataset. The visual BERT is a single stream of models, it does not have separated
language encoder and visual encoder, they take the visual in the images as additional tokens to the
language instead and for the pre-trained task the visual encoder does not predict the vision path.
It does not predict the object and it just predicts the cross-modality matching and the masked
language model. I think due to this difference our models still outperforms them in all relevant
datasets like in the VQA area too.

</turn>


<turn speaker="Mohit Banal" timestamp="32:47">

Yeah. And then I think some other later word also has extended LXMERT to lots and lots more data and
Lats and lots more GQs and then there's clearly, you can see even better results but like Matt said
I'm sure there is some saturation soon and then it much more interesting to see how to force these
models to start thinking toward generalization and also uni-model improvement.

</turn>


<turn speaker="Matt Gardner" timestamp="33:09">

If you had infinite compute and resources to get any already existing data that you could, what's
your intuition for like the best way to train a vision plush language encoder does it, does the
question make sense? Like it sure seems like language modeling is a reasonable way to like, if I
have infinite compute, just get really good representations for language. How do we do this for
vision plus language? If I have infinite compute?

</turn>


<turn speaker="Hao Tan" timestamp="33:37">

I think it's might be better to train on the YouTube videos and it's captions. I didn't know the
exact number, but I think it's the largest vision language dataset. Because in the video it's, each
video would have multiple images and the languages would have very large language dataset and I
think even better if, every pupil could take some, take their phone and just take photos and speak
to the phone and we collect this kind of dataset. I think it might be even better because this is
how we teach the chat teach the children to learn the language, we show them what is a table, what
is a chair and what is a table and a chair by language?

</turn>


<turn speaker="Mohit Banal" timestamp="34:17">

Yeah. I think the main thing we are missing in all this research community, maybe not the whole
community, but something that we've been discussing on this podcast is all the nonverbal modality.
So when we attend some, like we had this recent workshop last year, end of last year with speech
language and robotics from NSF. And basically we have a lot of colleagues there who work extensively
on gesture, on views on a lot of like pointing to things like house here. That's how we teach kids.
So that's fascinating to me because there's just a, obviously there's a dataset for that like Matt
said, if I could just close my eyes and wish for datasets I would like a reasonably large dataset
that has either the nonverbal modality in addition to just language and images.

</turn>


<turn speaker="Matt Gardner" timestamp="35:04">

Yeah. Great. It's interesting to hear your thoughts. You've, you've worked on this more than I have.
My intuition was also YouTube videos that that's probably the best already existing data source if
you had infinite compute to run on stuff. Yeah. But you're right, if we're talking about infinite
resources to collect data, then you could probably do more interesting stuff. But that's, that's a
harder problem.

</turn>


<turn speaker="Mohit Banal" timestamp="35:25">

Videos are a good way to extract the kind of thing that, I'm talking about, but they'll still not be
keen enough.

</turn>


<turn speaker="Matt Gardner" timestamp="35:31">

Yeah.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="35:32">

Yeah. Okay. Thanks. Really enjoyed reading your paper, chatting with you. Is there anything that
you've been doing after this paper was published that you'd like to talk about?

</turn>


<turn speaker="Hao Tan" timestamp="35:44">

The major thing I'm currently working on is that I want to test whether as we all said that before.
Like we in this work are we that the pre-training and the cross-modality is possible and the second
thing I want to show you is that whether the vision modality and the language of modality would help
each other like if the visual modality would help to build a better language pre-training encoder
and all the language encoder could help to build the better pre-training encoder. So this is a major
thing I'm kindof looking at and, I also want to look another thing because this work would build
pre-trained language across modality with parallel data so it requires the image and the sentence to
be corresponded to each other. The thing I want to look at is that whether, we could build the
cross-modality representation with unparalleled data. Is it just have a large language corpus and
the large image corpus whether we could just build a cross-modality representation based on this to
fit.

</turn>


<turn speaker="Mohit Banal" timestamp="36:42">

Yeah, so sort of like the non parallel data that exists in much bigger quantities and then it goes
back to some of Matt's points about the later alignment learning versus some noisy initial
alignments. So all of that, and then obviously from our other work on TVQA and TVR , we are also
trying to with some other students dive in deeper into videos to influence because that's a lot of
images in one view and obviously lots more of spatial and temporal as opposed to just spatial
information.

</turn>


<turn speaker="Matt Gardner" timestamp="37:09">

Yeah, this is, that's really interesting. I hadn't thought of that. This connection between a vision
plus language, multimodal representations and like unsupervised machine translation kinds of stuff.
There's really interesting things to think about along those lines. That's really interesting.

</turn>


<turn speaker="Mohit Banal" timestamp="37:25">

Yeah, and all the bridging stuff also.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="37:27">

All right. Thanks a lot for this interesting discussion. I had fun chatting with you.

</turn>


<turn speaker="Hao Tan" timestamp="37:32">

Great. Thanks. Thanks for your time.

</turn>


<turn speaker="Mohit Banal" timestamp="37:34">

Thank you.

</turn>
