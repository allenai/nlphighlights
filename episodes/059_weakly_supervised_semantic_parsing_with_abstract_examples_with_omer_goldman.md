---
title: "Weakly Supervised Semantic Parsing With Abstract Examples, with Omer Goldman"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Omer Goldman"]
number: "059"
tags: []
description: "ACL 2018 paper by Omer Goldman, Veronica Latcinnik, Udi Naveh, Amir Globerson, and Jonathan Berant Omer comes on to tell us about a class project (done mostly by undergraduates!) that made it into ACL. Omer and colleagues built a semantic parser that gets state-of-the-art results on the Cornell Natural Language Visual Reasoning dataset. They did this by using \"abstract examples\" - they replaced the entities in the questions and corresponding logical forms with their types, labeled about a hundred examples in this abstracted formalism, and used those labels to do data augmentation and train their parser. They also used some interesting caching tricks, and a discriminative reranker. https://www.semanticscholar.org/paper/Weakly-supervised-Semantic-Parsing-with-Abstract-Goldman-Latcinnik/5aec2ab5bf2979da067e2aa34762b589a0680030"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is Omer Goldman who is a master student studying computer science with
Jonathan Berant at Tel Aviv university. Welcome to the program Omer.

</turn>


<turn speaker="Omer Goldman" timestamp="00:22">

Hi, thank you.

</turn>


<turn speaker="Matt Gardner" timestamp="00:23">

Today we're going to talk about a paper that was recently accepted to ACL 2018 titled Weakly
Supervised Semantic Parsing with Abstract Examples. And this is a paper with some collaborators at
Tel Aviv university. Veronica Latcinnik, Udi Naveh, Amir Globerson, Jonathan Berant. And what I
thought was pretty cool was this paper actually was a final project for a class. Omer was just
telling me that he's a master student and Veronica and Udi were bachelor students at the time this
work was done. So a nice piece of success from a class project. You don't often get an ACL paper
from a class project. Nice work.

</turn>


<turn speaker="Omer Goldman" timestamp="01:05">

Thanks.

</turn>


<turn speaker="Matt Gardner" timestamp="01:06">

So can, can you start by telling us the setting of this paper, like what's going on here.

</turn>


<turn speaker="Omer Goldman" timestamp="01:10">

So this paper is basically a parser built for a new database. CNLVR And I believe you have like a
previous podcast with Alane Suhr, that published the same paper. There's like basically image and
like each image has the boxes with various shapes in different colors and a sentence that might be
true or not true with respect to this image. The thing is that the images are pretty simple. So the
images can be either taken as is, as pixels or as structured representation from which the image was
created, so the images are pretty simple but the language is like fully natural and they did it in a
way that it's also pretty complicated. So a lot of subordinated clauses and co-referencing and stuff
like that. So we took this problem as a semantic parsing problem, meaning given the sentence we try
to translate it to a logical language that can be executed. And then a reward is given to the parser
from the denotation, either true or false with respect to the image.

</turn>


<turn speaker="Matt Gardner" timestamp="02:41">

Just to give the listeners a bit more concrete idea of what's going on here an examples in your like
top right figure page one. The example that you give is there is a small yellow item not touching
any wall. So you get a picture with different shapes in it and you need to know is this statement
true or false. Right? And you could imagine this is really complex. How can you try to answer this
question if you don't have some kind of like formal representation of the sentence, it seems really
challenging, which is why semantic parsing where we're getting this logical representation of the
statement seems like a natural way to go. Right?

</turn>


<turn speaker="Omer Goldman" timestamp="03:21">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:22">

So in the paper you mentioned that this is the first semantic parser for this. What are the previous
methods that people have tried to address this problem.

</turn>


<turn speaker="Omer Goldman" timestamp="03:30">

So when we started work about it, it was like a fresh new data set only with the baselines published
in the original paper since then in NAACL there will be another paper on that from, I forgot who,
sorry about that, and they use like a bi-directional attention between the picture and the, so they
cannot actually not the semantic parser that is

</turn>


<turn speaker="Waleed Ammar" timestamp="03:57">

So it's a classifier, their output is just a binary variable.

</turn>


<turn speaker="Omer Goldman" timestamp="04:01">

Exactly. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="04:03">

Yeah. I believe that was Mohit Bansal a student who were treating it as like a visual question
answering kind of problem. I guess one quick note is there's an image that you can look at, and
there's also a structured JSON knowledge-base representation and your work, Omer just like you said
the structured KB to answer the questions whereas Mohit's paper with his student looks at the image
instead of a structured KB. So it's a harder version of the same data.

</turn>


<turn speaker="Omer Goldman" timestamp="04:36">

Yeah, so we try to train a neuro semantic parser and took a recent work by Kelvin Guu, combining
reinforcement learning and marginal maximum likelihood with some tricks to help combating spurious
programs. Because of the, denotation is binary spuriousness is a super major problem. Like every
program that is actually just compiling has a 50% chance of being correct. And so that's quite a lot
of noise during the learning process.

</turn>


<turn speaker="Matt Gardner" timestamp="05:29">

Can you give an example of what you mean like something really concrete for what spurious means
here?

</turn>


<turn speaker="Omer Goldman" timestamp="05:36">

So let's say, I don't know, in that case, let's say there's, if, if the, if the parser just outputs
something that is trivially true, then it will be correct on more than every other on every other
example.

</turn>


<turn speaker="Matt Gardner" timestamp="05:57">

Yeah. So for the example in your paper that we had mentioned earlier, there was a small yellow item
not touching any wall.

</turn>


<turn speaker="Omer Goldman" timestamp="06:04">

Yes. So if it will output, just exist all items, for example. That's true. If it will output, I
don't know, exist, the triangle exists, you know, filter all items, on the X, triangle X, then
that's true. So, yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="06:19">

Yeah. So it's really interesting. For like a decade, people have tried to learn semantic parsers,
learn to answer questions using logical formalisms where the logical form is not annotated. All you
have is a question answer pair. And so in this case you have to figure it out for yourself or
marginalize over the latent logical form. If you have a good answer signal, this is possible. Like
if the answer is actually somewhat discriminative, there are lots of answer choices and you only get
one of them there. So there are relatively few logical forms that will give you the correct answer.
But in this data set it's particularly challenging because there are only ever two answers, true or
false. And so you won't, you can only cut your space of logical forms in half so that this
marginalization is very tricky.

</turn>


<turn speaker="Omer Goldman" timestamp="07:09">

So we actually applied like another trick, but that's actually only relevant to this dataset because
every sentence appears four times. So we can actually redefine the example. So it's not just true or
false, but it's actually let's say a vector of size four of true and falses. In that case, the
chances of getting the correct answer is one 16 instead of half. So that's a bit better.

</turn>


<turn speaker="Matt Gardner" timestamp="07:40">

Right? Yeah, that is a lot better.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:41">

So that's because the same image has several utterances [inaudible].

</turn>


<turn speaker="Omer Goldman" timestamp="07:48">

Yeah, it's the other way around. I like one sentence has four images, or four databases actually in
images it's a bit more, quite a lot more.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:58">

How's this better than having just four as many examples is that, is that more useful than having
four as much training sentence?

</turn>


<turn speaker="Omer Goldman" timestamp="08:08">

I believe so because like if you have, because here we are talking about how easy it is to get the
correct answer by chance. If you have just four times the examples, then still for every example you
have like a 50% chance of getting the correct answer. So like from the top of my head, I would
assume that given that we didn't have four times example, but like we did try, we did try to train.
Like I'll final model with all, with all the features without this one, like without tying the
rewards for two examples and it like failed. Kind of miserably.

</turn>


<turn speaker="Matt Gardner" timestamp="08:56">

You can imagine each gradient step that you take, having additional constraints on the direction
that gradients should go is going to be helpful at every gradient step. If you'd just take all of
those constraints and separate them into four different steps, maybe you can still end up with the
same split, same place over like several iterations, but it's going to be a whole lot harder to take
the right step. That's how I think of that.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:21">

So that reasoning maybe suggests that if we cluster if we create many batches, where all four
examples. Oh yeah. Never mind. Yeah. That would not be possible.

</turn>


<turn speaker="Omer Goldman" timestamp="09:33">

Yeah, it's not, it's, it's not about batches, but more about like kind of redefining the example.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:38">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="09:40">

And, I said gradient it's even in the search over the logical form space, you have a more
constrained search it when you have all four knowledge bases at the same time.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:51">

That's right, yes.

</turn>


<turn speaker="Matt Gardner" timestamp="09:53">

Okay. So I think we've set up this problem enough. Hopefully listeners have some idea of what this
data set is and the problem we're working on. So how do you solve this problem of mapping language
to logical forms with this really big supervision signal?

</turn>


<turn speaker="Omer Goldman" timestamp="10:10">

Yeah, so basically after we started we trained something, let's say RandoMer, that's the algorithm
from Kevlin Guu, then we said, okay, so we didn't, we didn't converge to anything. So we started, we
wanted to annotate some sentences to warm start the model at that point, well we started out of
being lazy to be honest, and we said instead of like annotating a lot of sentences, some of the
sentences are pretty similar. So let's annotate them and then apply that to a few sentences at the
time. So that's like, you know, necessity being the mother of invention or something like that. So
yeah. So that's why. So that's why we started with that. And then after annotating a lot of examples
and a lot of abstract examples, meaning we took some words that are highly similar, let's say a
triangle, a rectangle and a circle or blue, yellow and black.

</turn>


<turn speaker="Omer Goldman" timestamp="11:17">

That's like the shapes and the colors in the dataset. And we swap them with let's say an abstract
symbol, color or shape. So instead of there is a blue triangle, the sentence is there is a color
shape. So we had seven clusters like that for shape, for color, for spatial relations, meaning above
and below and also touching. We had numbers being clustered together and the other ones were size.
Also not very useful because there aren't a lot of sentences dealing with sizes. But it appears
there, let's say I know mathematical relations at least more than an equal and location for the
sides of the boxes or for top or bottom because quite a lot of images contain towers, meaning like a
few rectangles on top of each other and many turkers related to that. So we did that, we annotated
the abstract examples with abstract programs and so now we have a way to create a lot of annotated
examples. We annotated 106 abstract examples and created a dataset of something like 6,000 annotated
examples for supervised learning for pre-training actually to warm start the model. And so we did
that. Things work better, still not that good at that point. Jonathan Berant, like the instructor of
the course that this project was done in, eh suggested to use caching because there was a recent
work of his with the deed that anytime,

</turn>


<turn speaker="Waleed Ammar" timestamp="13:16">

So actually before we get too into the question can be explained the difference between an abstract
problem and the actual logical form that you execute on that knowledge base.

</turn>


<turn speaker="Omer Goldman" timestamp="13:26">

Okay. So let's say the sentence is the is "The yellow triangle." So the abstract sentence is there
is a color shape or there is a color symbol shape symbol. So the logical form will be something like
exists, filter all items, Lambda X, yellow X, and triangle X. And when we annotated there is, a
color symbol, shape symbol, we annotated that with exist filter all items, Lambda X, color symbol X
and shapes symbol X. So we had this kind of alignment between the abstract tokens in the abstracts
and the abstract tokens in the logical form. So that's what we did. What we actually execute is for
a given sentence, let's say there is a yellow triangle switch. They say like swap the color symbol
with yellow and the shape symbol with triangle and then execute that program. So that's what was
executed eventually.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:43">

So you get variations of the same, right? The main structure and the main semantic representation.
Got it.

</turn>


<turn speaker="Matt Gardner" timestamp="14:49">

So basically it sounds, you have a list of types and a list of examples of each type. And so you're
replacing concrete instances with their type in both the sentence, the utterance and the logical
form. And that's what you mean by abstract. It's just replacing instances with their types.

</turn>


<turn speaker="Omer Goldman" timestamp="15:11">

Exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="15:11">

Is there anything more than that or is it just instances and types?

</turn>


<turn speaker="Omer Goldman" timestamp="15:15">

Just that, exactly that.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:17">

What does the coverage look like? So you mentioned you annotated a hundred sentences. Is that right?

</turn>


<turn speaker="Omer Goldman" timestamp="15:24">

Abstract sentences. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:26">

Right. So that means labeling the parts and the sentence with a corresponding types and classes.

</turn>


<turn speaker="Omer Goldman" timestamp="15:33">

And annotating that. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:35">

So once you do this this of course this cannot cover next one or the, the whole words that are in
the sentence in the annotated dataset. Do you have any measure how much coverage you get by doing
this?

</turn>


<turn speaker="Omer Goldman" timestamp="15:49">

So I don't know exactly how much the 106 cover, but something like 200 abstract sentences covered
about half of the dataset. I mean the, the dataset itself, the images are pretty simple. So the
language is natural, but it is, let's say quite repetitive because like you know how many different
sentences you can say about triangles, rectangles and circles in different colors. The
compositionality of the language is pretty, there is some major problems relating to
compositionality, but the lexicon itself is pretty.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:37">

constrained.

</turn>


<turn speaker="Omer Goldman" timestamp="16:37">

Yeah, exactly.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:40">

And when you say half of the sentences are covered. This means all the tokens and the sentences.

</turn>


<turn speaker="Omer Goldman" timestamp="16:46">

Yes. But like, so I'm not saying that our tokens, but our tokens that were abstracted cover half of
the tokens in the dataset. I mean that if you take sentences and abstract them then the dataset is
going from being 3000 sentences to being something like thousand sentences. If I remember going to
the numbers, something like thousand and 200 of them appear to actually consistent of half of the
dataset.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:26">

I see. So I guess my question was different than, so let's say you didn't, not all of the examples
that you annotated had the color red in it and then what do we do with this color when we encounter
it in another example.

</turn>


<turn speaker="Omer Goldman" timestamp="17:39">

So we abstract like all the colors, all the color words are abstracted to the color symbol.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:50">

But you haven't seen the word red in any of the hundred sentences that you have annotated, how would
you cover it?

</turn>


<turn speaker="Omer Goldman" timestamp="17:56">

Oh, okay. So, so there is no red in this dataset. There's only yellow, black and blue.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:02">

Sorry, I meant there's no red in the hundred the two annotated. But they're is red and other
sentences?

</turn>


<turn speaker="Omer Goldman" timestamp="18:08">

No. In that case, like we went, we went over the, it's, it was, it was fairly simple to go over then
the lexicon, all the words that were used in the utterances in the dataset, something like 120
words. So we went over this 120 words and replaced all the colors that we found, there, three with
the symbol.

</turn>


<turn speaker="Matt Gardner" timestamp="18:32">

How do you actually train a model then with these abstract examples? I think you were telling us
about training a supervised model and then caching again before we get to caching. How do you,
what's the actual training algorithm, if you have these abstract examples, how does this work?

</turn>


<turn speaker="Omer Goldman" timestamp="18:48">

So the training algorithm with this abstract example, we start with generating more data for
supervised learning. And then the weekly supervised training we won't start the model there with the
result from the supervised training. So we generated 6,000 sentences and programs from the 106 that
we annotated manually and then we trained supervised model on them. And the model itself is a
sequence to sequence and coder decoder, architecture LSTM encoder for the sentence and a fully
connected decoder for the logical program. That's, we basically took the model from the Kelvin Guu
paper that I mentioned earlier. On top of that, we added a re-ranker. So we did the beam search
doing the weekly supervised training and we wanted to catch the program, the correct program, even
if it wasn't the first one in the beam. So we trained a re-ranker over that. So that's, wait, no, so
that's, that's the supervised training.

</turn>


<turn speaker="Matt Gardner" timestamp="20:15">

And one point on that that you didn't mention, but I think it's important for listeners to
understand, you didn't just use a typical sequence to sequence model because you actually had type
constraints on, on the decoder. That's true. You want to explain what that is, how that works?

</turn>


<turn speaker="Omer Goldman" timestamp="20:31">

Yeah. Okay. So, basically we limited the search. So every time the decoder outputs the next token,
it must be a token that is valid, a token that makes sense. So every program that is searched can be
at least compiled, at least work. So for that, the language, the logical language that we used, it
was like very easy, overly convenient for that matter. Because every token has a type and every
token that is actually, it's either a constant variable or function. Every function takes only very
specific type of tokens as arguments and outputs only specific type. So using a stack we could we
could limit the search to output only valid tokens. So yeah, that's also something we did. So after
training, supervised and model, we took that as an initialization in weakly supervise training in
the weakly supervised training we used beam search, in that beam search in order to, let's say
remind the model. Good programs get founded earlier. We use the cash. The thing is that the cash,
the cash we used since we already have this obstruction method and it was actually abstract
sentences and abstract programs, meaning that if the pastor found a consistent program for there is
a yellow triangle, it can use it also for the sentence like there is a blue circle.

</turn>


<turn speaker="Matt Gardner" timestamp="22:26">

So this means then that if I see there is a yellow triangle and I find a logical form that matches
or that gives me the, that is consistent, that gives me the correct answer on all of my different
knowledge bases, then I'm going to save that in my cache and the next time I see the same abstract
utterance and the example there is a blue circle. Those because they have the same structure except
for these lexicon type words, I see the same thing. I'm going to retrieve the same logical form. I'm
just add that to my beam and keep going is this right?

</turn>


<turn speaker="Omer Goldman" timestamp="23:05">

Yeah, exactly. So what I save in the cache is not the program for the is the yellow, the easily
yellow triangle, but the program for there is a color shape, color, symbol, shape symbol. And then I
can also retrieve for other sentences. So that also directed the search and then the output that
beam was re ranked using a re-ranker with similar architecture to the model that we, that we use to
decode them

</turn>


<turn speaker="Matt Gardner" timestamp="23:41">

Can I ask one quick question on how the weakly supervised training works? So if I understand it
right, what you mean by weakly supervised training is that; I'm going to do a beam search,I'm going
to try to find a set of logical forms and then take all of the ones that actually evaluate to the
correct answer. And I'm going to have as my loss function, the negative log likelihood of the, sum
of those logical forms. So like the marginal likelihood of all of the correct logical forms. What if
I don't find a logical form that has the right answer? What happens? Do you just skip it?

</turn>


<turn speaker="Omer Goldman" timestamp="24:24">

Then the reward is basically zero. Like there's no, there's no, there's basically no update to make.

</turn>


<turn speaker="Matt Gardner" timestamp="24:35">

I see. Okay. So you're not explicitly penalizing anything there because you're just maximizing the
correct things that you see. So you'll effectively just skip that example and keep going.

</turn>


<turn speaker="Omer Goldman" timestamp="24:45">

Yeah, it's basically like learning from let's say, positive feedback. And if there is no positive
feedback, then you can perform no learning.

</turn>


<turn speaker="Matt Gardner" timestamp="24:53">

And so then that means that if you just start in a bad state and you can never find anything good,
you're just going to waste a whole bunch of computation and never get a gradient update.

</turn>


<turn speaker="Omer Goldman" timestamp="25:03">

Exactly. So that's, that's why in the beginning like nothing works. Like generally with delayed
reward, the problem is to get things started. Once they start it's easier.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:18">

Well then, and your problem, I think it's pretty unlikely that you would get no correct, no
compatible logical form.

</turn>


<turn speaker="Omer Goldman" timestamp="25:26">

Like when we actually tried that, we tried to have no pre-training at all. Just letting the weak
supervision learn something with this random algorithm. Yeah, we basically got chance.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:39">

No, I didn't mean that a feature includes supervision is not important. I just think that the
chances of getting no compatible logical forms its very slim.

</turn>


<turn speaker="Omer Goldman" timestamp="25:52">

Yeah because of the spurious programs. I mean you might find something that's happened to give the
right example. Is it like is it something good? I like, I truly don't know. Some, some examples have
for example, on all four denotations being true. In that case, it makes sense that something will
happen. Let's say some reward will be given. Is it the correct program? Most probably not, but
something we be given.

</turn>


<turn speaker="Matt Gardner" timestamp="26:23">

Yeah, and I guess this highlights another problem with this kind of supervision because you're doing
a beam search to find things to reinforce and if you find the wrong thing you're going to reinforce
the wrong thing you're going to reinforce the spurious program and you're just going to have a hard
time and not really learn anything that's generalizable.

</turn>


<turn speaker="Omer Goldman" timestamp="26:43">

Even with the type constraints and with the reward trying and everything, like in the beginning, we
noticed that the pasta sometimes just don't, just doesn't know when to stop. The programs just tend
to be super long, beyond the threshold that your given and then it just stops. So that's also a
problem.

</turn>


<turn speaker="Matt Gardner" timestamp="27:07">

Cool. I think we've talked about all of the methods well enough. So you want to tell us about the
experiments you ran and how this actually worked.

</turn>


<turn speaker="Omer Goldman" timestamp="27:15">

So we basically trained, we used each step of this, of this let's say process that I was just
describing as a model by itself. We used what we call the rule based parser that just took the
sentences that we actually passed manually and gave them the correct parsing and the other one just
returned true. And then we used the supervised model, let's say the parser that was only trained in
a fully supervised manner as a model. And we took the weakly supervised and trained model and to
both the last one we had the ranker. So there was an option with or without the ranker to see if it
adds or not. So basically we saw that each step we're doing was contributing to the, to the outcome.
So the rule base parser could only provide good answer to actual utterances that we saw that we had
the computer manually annotated. But it's still got pretty high. I mean, like it got around the
baseline and results. So that means that this high coverage by absolute example by itself already
give some result.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:51">

So that is the baseline you're referring to here.

</turn>


<turn speaker="Omer Goldman" timestamp="28:52">

So the baseline was a maximum entropy classifier done by Alane Suhr that published this and Yoav
Artzi and the other guys then that published this dataset because when we started working on that,
there was no other work. So that was our baseline. This is maximum entropy classifier and it got 68%
accuracy. Just outputting true to everything gives 55 so there's like small true bias and only using
the abstract program that we manually annotated because we annotated 106 but it already gives 66%
accuracy on the deficit using the supervised model, especially with the re-ranker gives quite a huge
boost of 10% boost to the percentage points. Boost to this accuracy. In using the weakly-supervised
meaning training from denotations as well because up until that point, there's no denotation
involved in this. So using denotations as well gave us like the best result, like 85.7 deficit.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:23">

So I have a question. Until you combined the supervised plus discriminator and this re-ranker, how
do you leverage this supervised data while you're training the weakly supervised model. You
mentioned there's separate models.

</turn>


<turn speaker="Omer Goldman" timestamp="30:39">

So wait, can you, can you ask like again, I didn't, I didn't say you didn't get that.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:43">

So my understanding is that you have different models that do the supervised learning, a separate
one for weakly supervised and a separate model for the discount rerank. So in the results that you
show combinations of these, how do you combine them?

</turn>


<turn speaker="Omer Goldman" timestamp="30:59">

Okay, so the, reranker is trained on the output over the base model.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:05">

With the same training data?

</turn>


<turn speaker="Omer Goldman" timestamp="31:07">

Exactly like once the model is done with its training, then we use the beams that it outputs to
train the re-ranker. So that's how we combined the models with the re-ranker. We gave the supervised
supervised model that was trained with no beam because it just supervised. We gave it one run to
one, running, to check the beam that it outputs. And then we train the re-ranker on top of that.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:42">

And the same is also true for the weakly supervised version for of 30 ranked. So there, and how
about the using the supervise data, the labeled data, I suppose you use pre-training. I thought that
you used pre-training but then there are separate models.

</turn>


<turn speaker="Omer Goldman" timestamp="32:01">

Yeah. Okay. That's the thing. Like we refere to that as a separate model in the main table of the
results we have a list of models. Each model is actually a step towards the full model. Meaning we
did the rule based parser is using the data we generated. And then we did the supervised training
that you can take as-is or you can use it as a pre-training for the weakly supervision. So the
weakly supervision without pre-training is, The model there is not a weak supervision without pre-
raining.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:46">

I see. Yeah. So you, when you say weak supervision, it also includes pre-training with a supervisor.

</turn>


<turn speaker="Omer Goldman" timestamp="32:52">

Exactly, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="32:54">

And I guess just to highlight the results, you get up to 85.7 dev accuracy and 84 test accuracy on
the public test set and 82.5 on the hidden test set that you have to submit to Elaine. So this is
substantially better than anything that was published before. Nice work. Do you, do you have any
idea, so 85, 84 is pretty high relatively, there's not a huge gap. Do you have any idea of like
what's left to figure out in this dataset? Like for, for future research, what should it focus on?

</turn>


<turn speaker="Omer Goldman" timestamp="33:38">

It's actually a tough question. Like the thing is that we don't actually know what's the human level
performance on a dataset like that. Cause there are a few examples that are ambiguous or just
questionable, you know, like senses that even a person wouldn't understand. We didn't check like how
many are there some there are some errors that this parser is doing. Like not surprisingly with more
complicated sentences. So like although we had some, it's a progress in the compositionality front.
There is still stuff to do, let's say sentences with more than one relative with one more
subordinate clause was something, but sometimes the parser didn't manage to learn. So that's
something that can be done still, I think.

</turn>


<turn speaker="Matt Gardner" timestamp="34:43">

Yeah, it seems not, seems like it's not a whole lot of data to learn really complex compositional
sentences that have like a lot of nested clauses. Cool. Any last thoughts before we conclude?

</turn>


<turn speaker="Omer Goldman" timestamp="34:58">

No, I don't think so.

</turn>


<turn speaker="Matt Gardner" timestamp="35:00">

Great. It was nice having you on. Thanks for talking and nice work.

</turn>


<turn speaker="Omer Goldman" timestamp="35:03">

Thanks for inviting me.

</turn>
