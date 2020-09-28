---
title: "A Corpus of Natural Language for Visual Reasoning, with Alane Suhr"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Alane Suhr"]
number: "038"
tags: []
description: "ACL 2017 best resource paper, by Alane Suhr, Mike Lewis, James Yeh, and Yoav Artzi Alane joins us on the podcast to tell us about the dataset, which contains images paired with natural language descriptions of the images, where the task is to decide whether the description is true or false. Alane tells us about the motivation for creating the new dataset, how it was constructed, the way they elicited complex language from crowd workers, and why the dataset is an interesting target for future research. https://www.semanticscholar.org/paper/A-Corpus-of-Natural-Language-for-Visual-Reasoning-Suhr-Lewis/633453fb633c3c8695f3cd0e6b5350e971058bed"
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


<turn speaker="Matt Gardner" timestamp="00:11">

Okay. So today our guest is Alane Suhr, who is a PhD student at the university, at Cornell
University studying with Yoav Artzi. And she has done work in, she's interested in semantics and
pragmatics and had the best resource paper award at ACL 2017 and she's here with us to talk about
it. So thanks for joining us Alane. This paper that we're going to talk about is titled a Corpus of
Natural Language for Visual Reasoning. And the paper introduces a dataset that pairs complex
synthetically generated images with human generated statements that describe them. And the task is
to decide whether this description is true or false. So Alane, can you tell us, what was your
motivation for creating another dataset?

</turn>


<turn speaker="Alane Suhr" timestamp="01:00">

Okay, so this project initially started as wanting to study how certain linguistic phenomena
quantifiers were grounded in a visual environment. And we realized we wanted to extend this more to
situated visual reasoning. We found that a lot of the focus in current vision and language datasets
was in recognizing a diverse set of scenes and objects or compositionality of concepts such as like
a color and an object. But instead we wanted to focus on compostionality of linguistic phenomena
like negation and coordination and counting.

</turn>


<turn speaker="Matt Gardner" timestamp="01:38">

Okay. And you said quantification there, I think that's a word that if you haven't studied
linguistics or done semantics, you might not be too familiar with. Can you give some examples of the
kinds of things you're talking about?

</turn>


<turn speaker="Alane Suhr" timestamp="01:48">

Sure. So a quantifier is a word like "a" or "the" or "all" or "some." And in this dataset, for
example you might have a sentence saying all of the blocks are blue. And in order to resolve that,
you have to look at each block in the image. And if every single one of them is blue then it's true,
if anyone is not, they're not true. So that's grounding "all" to kind of the concept of every single
one is blue.

</turn>


<turn speaker="Matt Gardner" timestamp="02:15">

So are there data sets already that handle these kind of phenomenon?

</turn>


<turn speaker="Alane Suhr" timestamp="02:19">

So when we started working on this dataset, there were not any that specifically focused on these
kinds of phenomena. Since then there has been more focus on this. For example, the CLEVR dataset
that came out a few months before ours. But at the time ours was the first that we knew about to
focus on this.

</turn>


<turn speaker="Matt Gardner" timestamp="02:39">

Okay.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:40">

Could you tell us a little bit about the construction of the datasets, how the data was generated,
both the images and the natural language?

</turn>


<turn speaker="Alane Suhr" timestamp="02:48">

Sure. so first step in our data collection process was generating images that would later be
annotated. We constructed or design these like very small environments that were meant to kind of
elicit this complex or compositional language. Should I go into what these look like? Okay. So each
image contains three boxes and each box contains several objects. The objects have three different
shapes like circle square and three different colors and sizes. So it's kind of restricted in the
number of features, values of the features that can have the objects are either scattered around in
the box or in towers. And this was meant to kind of elicit like spatial reasoning and spacial
relationships in the language. So that's what the images themselves look like.

</turn>


<turn speaker="Alane Suhr" timestamp="03:50">

When we do the generation we first randomly sample properties. So like the number of objects in each
box and what properties each object has. And for a specific sentence writing task, we will generate
four images. I'll go into why we generate four images later, I guess. But we start by generating two
images randomly, like I described before. And with the last twq images, we actually take all of the
objects in the first two and permute them across the second two objects. So all the objects in the
second two images are the same as the ones in the first two. So that's the image generation phase.
The second phase is then now writing a sentence about this example. Workers were instructed to write
a sentence that was true about the first two images and false about the second two images. This was
designed so that they were like required to kind of find similarities between images and also like
differences.

</turn>


<turn speaker="Alane Suhr" timestamp="04:48">

So kind of priming them for complex compositional language. Additionally, we because we did the
permutation between the objects and the top two images in the bottom two images, this forced them to
not write trivial sentences like there is a blue object because all the objects will be present in
both the true and false images.

</turn>


<turn speaker="Matt Gardner" timestamp="05:07">

And in fact, it seems like this requires spatial descriptions, right? Because that's the only thing
that will be different between the two, is that right?

</turn>


<turn speaker="Alane Suhr" timestamp="05:15">

So the things that will be different between the two are spatial relations. That's true. But because
we have the three boxes we now have boxes that contain different objects.

</turn>


<turn speaker="Matt Gardner" timestamp="05:27">

Oh, you're also permuting between the boxes.

</turn>


<turn speaker="Alane Suhr" timestamp="05:30">

Yes. Between the boxes.

</turn>


<turn speaker="Matt Gardner" timestamp="05:32">

I didn't catch that.

</turn>


<turn speaker="Alane Suhr" timestamp="05:32">

Yeah. Yeah. So, for example, if there were like three blue objects in the top image across all three
of the boxes, those three blue objects might be in the same box in the bottom image.

</turn>


<turn speaker="Matt Gardner" timestamp="05:42">

Okay.

</turn>


<turn speaker="Alane Suhr" timestamp="05:43">

Yeah. so then the final stage was what we called a validation stage where we separated each of the
sentences into four pairs, with the four images. And we then presented to a worker an image and a
sentence and ask them if the sentence was true or false. And we did this in order to increase the
data quality because we collected multiple validations and then later removed low agreement examples
we also see how difficult this task was for people to complete.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:16">

So I'm curious to know how well did people do on this task?

</turn>


<turn speaker="Alane Suhr" timestamp="06:21">

So we computed a few different standard inter annotator agreement metrics. We didn't compute
basically what the human performance would be exactly. So we computed Fleiss' kappa and
Krippendorff's alpha on the dataset. And so the alpha was a 0.83 and kappa was 0.81. Both of these
are like considered like near perfect or very high agreement.

</turn>


<turn speaker="Matt Gardner" timestamp="06:50">

Nice. So this sounds like a really complicated set up. Does it need to be this complicated? Why did
you iterate on this? How did you arrive at this particular setup?

</turn>


<turn speaker="Alane Suhr" timestamp="07:00">

Yeah, it is pretty complex. And this was because we were explicitly trying to focus on these
linguistic phenomena. So for one of the reasons like there's a lot of considerations. We took so
maybe I'll just talk about a few of them. For example, we wanted to pair each sentence with multiple
images. This was to address, I guess multiple things. One of them was we don't want linguistic
biases in the data that would indicate the label of the sentence without having to look at the
image. So by design, each sentence should appear with both a true and a false label on the dataset
which means that it will be very different. Like you won't be able to learn whether a sentence is
true or false without an image. Additionally, this also lets us look more into how we understand a
particular sentence.

</turn>


<turn speaker="Alane Suhr" timestamp="07:51">

So because it's paired with multiple images, we can see whether we fail on at least one of it's
paired images. This is to see whether we understand the sentence across multiple examples. Does it,
like, does our understanding of the sentence generalize across multiple worlds, I guess is what I'm
trying to say. Does that make sense?

</turn>


<turn speaker="Matt Gardner" timestamp="08:22">

Will the same sentence be true of more than one image?

</turn>


<turn speaker="Alane Suhr" timestamp="08:26">

So, yes. It could be because in the initial collection procedure, we have four images with one
sentence. So it should be true for two, and it should be [false for two]. So ideally we'd get the
correct label for all four of the images that could indicate me understand a little better. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:45">

So, the objects have multiple properties, their shape, their color, their size and location. Right.
which of these do you find that the natural language generated often referred to? Did people
recognize like yeah, maybe, maybe people tend to talk more about color more than they talk about
size for example.

</turn>


<turn speaker="Alane Suhr" timestamp="09:11">

Yeah. So we didn't do specific analysis of this, but just my observation when working with this data
is people mostly referred to the shape and the color of an object. Very, very few people actually
refer to the size of the object so that maybe our design of the environments didn't make that
salient enough for the workers.

</turn>


<turn speaker="Matt Gardner" timestamp="09:34">

It's also harder to judge visually. Right. And so part of it.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:40">

And when you mentioned that the objects are the same would be like the number of objects of a
particular type would be the same. You include in this all the properties. So you're not just making
sure that there is a triangle, you're making sure that there is a yellow big triangle somewhere in
both images. Right?

</turn>


<turn speaker="Alane Suhr" timestamp="10:03">

Yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="10:05">

That's really interesting. So how big is this dataset?

</turn>


<turn speaker="Alane Suhr" timestamp="10:08">

So we have almost 4,000 unique sentences and almost a hundred thousand pairs of images and sentences
together.

</turn>


<turn speaker="Matt Gardner" timestamp="10:19">

Wow. So that, that means that you have about each unique sentence appears about 25 times in all of
the examples.

</turn>


<turn speaker="Alane Suhr" timestamp="10:26">

Yeah. So as I said before so this 25 figure is actually 24, it's four times six. So four is like the
number of images that a sentence is initially paired with. So that's where the four comes from. And
six is the six possible permutations of the boxes in the actual PNG rendering of the image.

</turn>


<turn speaker="Matt Gardner" timestamp="10:51">

I see.

</turn>


<turn speaker="Alane Suhr" timestamp="10:52">

We included all six permutations to kind of as a test to see whether the models were robustly able
to solve the task the same no matter what the order is, cause the boxes kind of represent sets in
our environments.

</turn>


<turn speaker="Matt Gardner" timestamp="11:06">

Did you ever try a training these algorithms with only one permutation? Like the original
permutation?

</turn>


<turn speaker="Alane Suhr" timestamp="11:13">

Yeah, so not intentionally. But we did, one of the parts of this dataset is that selecting a
validation set is important. Like you have to be very careful about it because you don't want
permutations to exist across both your training and your validation set.

</turn>


<turn speaker="Matt Gardner" timestamp="11:33">

Right.

</turn>


<turn speaker="Alane Suhr" timestamp="11:33">

So when we actually made that mistake, we found that it overfit a lot on the validation set because
it was able to learn, at least in this dataset it was able to learn the permutation. So that was
kind of cool. That's our results on [inaudible].

</turn>


<turn speaker="Matt Gardner" timestamp="11:48">

Yeah, that's really cool.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:49">

Do you automatically assume that if a statement is true for a particular permutation of the boxes,
it can also be true for the others? Or do you have to ask a crowdsource worker to check that?

</turn>


<turn speaker="Alane Suhr" timestamp="12:02">

Yeah, so actually that's another one of the reasons we did the validation step. We initially told
the workers that they can't refer to the order of the boxes, but we wanted to make sure that they
didn't, by doing the validation and in the validation, we actually do shuffle the boxes again to
make sure that their answer is consistent.

</turn>


<turn speaker="Matt Gardner" timestamp="12:20">

Nice. so how well do current systems do on this?

</turn>


<turn speaker="Alane Suhr" timestamp="12:27">

So we haven't actually tried the most recent results on other visual reasoning datasets likethe
Relation Networks, or the End to End Module Networks. We just haven't had time to do that yet, but
we have gotten some preliminary submissions to the dataset as far as the structure representation of
the images go, I guess I haven't really talked about that, but basically doing semantic parsing on
the sentence and then trying to execute it on these structured representations and those results are
pretty promising. But the authors have not published anything yet, so I can't really talk about it
in detail.

</turn>


<turn speaker="Matt Gardner" timestamp="13:06">

And so what about what you presented in the paper? You have some baseline models.

</turn>


<turn speaker="Alane Suhr" timestamp="13:10">

Yeah. Right. So I guess I should make clear that we have two modalities to the dataset. We have the
images themselves so the PNG renderings, and we also have this structured representation that
dictates what objects and what properties are in the image. So as far as the, the PNG image
renderings go, we tried some very simple baselines, like a CNN and RNN encoding of the image and
sentence and then tried to classify them. We also applied the neurological networks approach to it,
which did give us the highest results on that modality. As far as the structure representation goes,
we constructed this huge set of features that basically parse the sentence into features talking
about like what numbers occur in the sentence and what are various counts of properties in the image
and then just apply to maximum entropy classifier on that. And that actually gave us the highest
result in the dataset.

</turn>


<turn speaker="Matt Gardner" timestamp="14:17">

I noticed the absence of any semantic parsers in the work that, in your paper, which was kind of
surprising to me, given your coauthors. And so like, is this hard for semantic parsing? Like why,
why was, why didn't you run any of any of those?

</turn>


<turn speaker="Alane Suhr" timestamp="14:32">

Well, honestly we this was a short paper, so we didn't have a lot of room for that. And we also
didn't want to spend a ton of time like trying to come up with seed examples. So this is definitely
something that we really want results on because we think it's, it's very, it's a really cool
approach, but we just, we didn't have the time or the space space to do that yet.

</turn>


<turn speaker="Matt Gardner" timestamp="14:56">

Okay. Yeah, that makes sense. And I guess you could think of the neural module networks as a kind of
semantic parser that executes on the image itself. Right.

</turn>


<turn speaker="Alane Suhr" timestamp="15:06">

Yeah, in a way.

</turn>


<turn speaker="Matt Gardner" timestamp="15:06">

Okay. So as I read this paper, I thought one criticism that people might have is that it seems
totally artificial, right? You have synthetic synthetically generated images in this really
contrived kind of domain. You have this really convoluted task that forces people to write
artificially complex language. I know I've I'm thinking particularly of folks at Google and
Microsoft who like to say that they get real questions because that's what people are actually
typing into the query box and they would never type anything quite so complex as this. So what do
you, what would you say in response to these criticisms?

</turn>


<turn speaker="Alane Suhr" timestamp="16:50">

Maybe not in such a concentration as it does in this dataset, but for example, if you have like a
robot that's doing dishes for you and you say, you know, put the plate in the cupboard so that the
stacks of plates are the same height this is something that is not totally, I guess someone might
say this expecting it to be able to be solved correctly. And so this kind of complex reasoning is
necessary I think to applying this work to like interfaces to robotics or something like that. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="17:29">

Yeah, I totally agree. I think it's a really interesting dataset and the reason for me that it's
interesting is that it isolates, I think the bAbI dataset as I've talked about a few times on this
podcast and similarly CLEVR the CLEVR dataset that you mentioned earlier, which is very similar but
uses synthetic language. The intent of these tasks is to isolate particular phenomena that we want
to study so that we can solve that problem and then move on to more things. And the nice thing about
your dataset is that it isolates the, my criticism of bAbi and CLEVR is that they use synthetic
language. It's not actually looking at language and vision because it's not really language. The
nice thing about your data set is that it lets us study complex composition but with real language.
And then you came up with a really nice way to actually elicit this complex language that's actually
from people and not from a program. And so it lets us actually study language in these constrained
contexts. And so if we can solve this, then we can move on to harder things such as this next
dataset that you were just talking about.

</turn>


<turn speaker="Alane Suhr" timestamp="18:39">

Yeah, exactly. And another thing, I guess part of the motivation was can we test the algorithms that
we know work on data sets like VQA on this slightly more challenging, linguistically challenging
dataset. It's kind of like a benchmark. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="18:58">

Great. I guess my last question for you, maybe Waleed has more, but my last question is: I do
semantic parsing research. So we currently have the best results on the Wiki table questions
dataset, which actually seems pretty similar in some respects to this dataset. Though it doesn't
have images. As a semantic parsing researcher, what is your pitch to me specifically? And instead
of, I guess, in this conversation so far, we've talked about like, why this interesting for NLP, but
for a semantic parsing researcher, why is this particular data set something I should focus on?

</turn>


<turn speaker="Alane Suhr" timestamp="19:35">

So the structure representations that I provide in the dataset make it really easy for us to I guess
execute some kind of logical form and determine whether or not our parsed sentence is valid with
respect to all worlds that we give it, I guess. I don't know if that makes sense. So one of the
motivations actually in creating this corpus and having the task of telling whether a sentence is
true or false, it's kind of inspired by like the formal semantics notion of having a sentences
meaning be a set of worlds in which it is true. And I think that it poses a challenge in semantic
parsing, focusing not just on coming up with let's see. So, so the set of entities in the, in the
worlds that we propose is very small. You know three colors, three shapes, three, three sizes. So
the challenge in semantic parsing is less of coming, like finding new words for new entities as it
is in grounding these linguistic phenomena such as quantifiers to operations over this small
environment.

</turn>


<turn speaker="Matt Gardner" timestamp="20:59">

That's great, and you hit on a little bit. What would be my answer to that problem? Why I think it's
interesting and why we are indeed looking at this is that you only get binary supervision. So all of
the labels are either true or false, whereas with a WikiTableQuestions dataset, the answers are
cells and tables or sets of entities or other numbers that are counts of things that this is your
label. And Pasupat and Liang had a nice paper showing how to do dynamic programming to enumerate a
reasonable set of logical forms given these denotations like the actual answer. And so that's a way
to get from question answer supervision to logical form supervision. But with your dataset it's a
lot harder, right? The best you can do is split your logical form space in half because you only get
binary supervision. So you have to be a lot smarter in how you go from question answer supervision
to logical form supervision. So it's a really interesting thing to look at.

</turn>


<turn speaker="Alane Suhr" timestamp="22:01">

Yeah, that's a really good point, also it does, you know, it only has these two classes, but it also
has up to four labels for each individual sentence. So you get feedback for each sentence. With
regard to like multiple true or false labels because images or sentences are paired with multiple
worlds.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:21">

Right. So, to close, do you have any like, suggestions or disclaimers for people who are actually
using the dataset? Like any caveats that you've experienced with when you were running experiments?

</turn>


<turn speaker="Alane Suhr" timestamp="22:34">

So the major thing was choosing a validation set properly. I think at one point there was someone
who thought that their performance on the validation set was like amazing and then couldn't get any
farther because once they had fixed the issue with the permutations leaking across the validation
and training set. So that's like the biggest, I think the biggest disclaimer as far as working with
the data. And then also I guess maybe a plug is that we have this unreleased test set so people who
are working on this or would like to work on this we can run your code on our system and on that
test set and then we have a leaderboard where we can display the results. So.

</turn>


<turn speaker="Matt Gardner" timestamp="23:17">

Cool.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:18">

Awesome.

</turn>


<turn speaker="Matt Gardner" timestamp="23:19">

Thanks. Thanks for joining us. It was an interesting conversation.

</turn>


<turn speaker="Alane Suhr" timestamp="23:21">

Yup. Thanks.

</turn>
