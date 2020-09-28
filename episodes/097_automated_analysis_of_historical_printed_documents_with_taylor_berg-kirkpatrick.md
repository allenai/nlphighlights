---
title: "Automated Analysis of Historical Printed Documents, with Taylor Berg-Kirkpatrick"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Taylor Berg-Kirkpatrick"]
number: "097"
tags: []
description: "In this episode, we talk to Taylor Berg-Kirkpatrick about optical character recognition (OCR) on historical documents. Taylor starts off by describing some practical issues related to old scanning processes of documents that make performing OCR on them a difficult problem. Then he explains how one can build latent variable models for this data using unsupervised methods, the relative importance of various modeling choices, and summarizes how well the models do. We then take a higher level view of historical OCR as a Machine Learning problem, and discuss how it is different from other ML problems in terms of the tradeoff between learning from data and imposing constraints based on prior knowledge of the underlying process. Finally, Taylor talks about the applications of this research, and how these predictions can be of interest to historians studying the original texts."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F719460085&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

This is Matt Gardner and Waleed Ammar we are research scientists for the Allen Institute of
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Okay. Today our guest is Taylor Berg-Kirkpatrick. Taylor is a professor at the university of
California in San Diego. Prior to that he was at CMU and before that at Semantic Machines and
Berkeley. Taylor, it's good to have you on the program.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Thanks for having me. Excited to be here.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Today we wanted to talk about some work that you did as a PhD student and then continuing on some
applications of that work. This is on OCR of historical documents and then what you can do with
these documents after you have OCR from them and you want to give us an outline of like why is OCR
on historical documents hard?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yeah, well I can talk about why it's hard and I can talk about why it's useful to, as most people
know, if you take an image of some modern text that was digitally typeset, super clean and you run
it through most OCR systems, you get nearly perfect accuracy. Like it just works out of the box.
We've kind of solved that problem to some extent as you might ask, well why isn't historical OCR
also solved? And the answer is basically historical documents don't look like modern documents for a
couple of reasons. One is they have a lot more noise. So if you imagine how a document was actually
produced in let's say the early modern period, it was produced on one of these historical printing
presses, which is like this big contraption where you're taking little metal stamps and fitting them
into these kind of mechanical grooves and then you paint ink on it and you press it and so you get
all kinds of noise from that.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

You get variation in inking level across a document, across a page. When that groove sort of changes
its straightness, you get wandering baselines of the text. Then also you have variability in the
underlying shapes of the characters. So the fonts that we have nowadays are fixed in recent time
scales, we've been using Times New Roman for a long time, but if you look back across hundreds of
years, it's kind of an evolution of font shapes of even writing systems. And so you go back far
enough and sometimes it can be hard to even read these things. Like if you look at like fracture or
like black letter there's, there's kind of certain historical fonts that are just look quite
different. And this means that system's trained on modern documents don't generalize well to
historical documents. There's also stuff I'm kind of glossing over, like there's a ton of issues
from the underlying scanning process as well. A lot of historical documents were captured on super
high contrast microfilm in the 1980s in libraries. And then the original documents were either
disposed of cause there were, there were like newspapers and thought to be kind of low value or
they're still around but you can't really get access to them so all you have are these scans where
you get, it looks like a terrible Xerox, like a really 1980s Xerox of a book that wasn't totally
flat in the scanner until you got all these weird issues from that as well.

</turn>


<turn speaker="Matt Gardner" timestamp="">

I saw in one of your papers if two pages were next to each other for a long time you might get
bleeding of ink from one page onto the other.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yeah that's a pretty common problem or in most cases actually bleeding back from the backside of the
page it's bleeding kind of through the print on the opposite side of the page and so you're getting
like backwards text letters appearing over the top of the letters. You're trying to recognize that's
actually a problem that this is maybe overkill, but we've always wanted to apply machine learning
solution to that because it's really a source separation problem. Like whatever you recognize on the
backside of the page is stuff that you can kind of subtract off the front side of the page and vice
versa. And so the two recognition models should be talking to each other.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah, that's an interesting problem. We can come back to the interesting machine learning problems
that are inherent in all of this and why this might be interesting just from a learning perspective.
The interesting point here as you said, is that we can't really just take the existing models that
we use for typical modern OCR stuff. Like I take my phone and I pointed at a sign and not only can I
recognize the text, I can translate it into Chinese or whatever. That doesn't really work for
historical documents for these reasons. So if I want to get the text out of historical documents,
what do I do? What kind of methods do people use to solve this problem?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

If you can imagine that people who consume this kind of technology and use it in their core
research. You're talking about people in literature, people in history, people in the humanities who
need to get transcriptions of large collections of historical documents. You guys touched on this
when you were talking to David Bamman about computational humanities and digital humanities. They
basically want to be able to ask simple statistical questions about the text itself, the kind of
simplest cases just search. You might want to be able to like search for the occurrence of a word.
From what I've seen a lot of people use commercial systems like ABBYY FineReader, which is known to
be decent at historical documents. Those systems though I hate a little bit, cause our commercial
systems are probably some combination of supervised methods, maybe some data augmentation, maybe
some kind of rule based post correction, maybe some statistical post correction.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

And so that's one method which is you try to deal with the domain gap through various techniques.
Like you try to get as much diverse supervised data as you can, even if it's at a domain and then
you try to build a system that doesn't overfit to it so that it can generalize to historical text.
So that's one set of approaches. Another approach that my group has focused on is to treat it as an
unsupervised learning problem. So instead of trying to learn from supervised data that's modern and
generalized to historical data, you just get a bunch of historical document images without the text
labeling, the kind of supervision and you try to fit a model that treats the text as a latent
variable. You kind of treat the OCR problem like a decipherment problem. It's like a noisy channel
model, right? It's like you've got an image of text that's in some weird font and it's maybe such a
weird font that it doesn't look like any font you've ever seen before, but you know it is a font,
which means that each time an "A" was printed or a "B" was printed, it's going to be roughly the
same shape.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Like there'll be multiple stamps for an "A" in a given type case, but they're supposed to all look
the same. Sometimes they get warped and stuff, but they're supposed to all look the same. And so
there's this regularity assumption. If you can figure out what the "A' looks like, then you can see
where all the A's are very with the B looks like zero, all the B's are okay. So that's one
constraint. The other constraint is, you know, it's text, you know, it's not a random sequence of
characters, right? It comes from some language model and that language model, you may have
generalization problems, but they're different from the font generalization problem. Like maybe you
can, you know, count characters, statistics and relatively modern documents and they will still
generalize to these historical documents. And so now you're trying to basically find the font such
that when you push the image through, it gives you a sequence of text that matches your prior
distribution on texts, which looks very much like, if you remember kind of Kevin Knights
decipherment stuff like working on the Zodiac Cipher and other things. It looks very much like that.
So you're kind of learning an emission model with a fixed transition model and trying to induce the
latent sequence.

</turn>


<turn speaker="Matt Gardner" timestamp="">

That's interesting. And so do you want to talk about some of the details of how the model actually
works when you try to do an unsupervised model of OCR on this?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yes. From far away you're kind of thinking, HMM, text is the sequence of states, the transition is
your language model, the emission is your type production model, and then you run forward backwards.
But of course it's not HMM. It's very much like speech in some sense. The basic unit that a system
like this operates on is a text line image. So it's a really long image of one line of text where
you don't know the character boundaries ahead of time. So while you're doing the normal HMM stuff,
updating the admission distributions with EM something like that, you're also trying to induce a
latent segmentation. So really it's a semi Markov model or a hidden semi Markov model. And that
means that in some sense the emission model is more intuitive, right? Instead of saying that we're
going to stay in the B state for multiple columns of pixels and then each time we transition to the
B state or stay in the b state, we emit new column of pixels that would be hard to define an
intuitive emission distribution on that would as you stayed in the "B" state give you something that
looked like a B. You'd have to kind of remember how far through the B state you were in things like
this, which is effectively making a sending Markov model,

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

but if you view it, if yours is a Semi Markov model, then your emission model looks like we're
printing a B right here between you know, pixel column, I have pixel column J. What should the
distribution on pixels look like and you get to put a bunch of machinery in there. You can say, well
there might be other latent variables like how far up or down is this particular "B" going to get
printed? How much inking noise is there? Is there any warping? Stuff like this, and so that's where
a lot of the work went on these models. It's like the language model is sort of basics. is sort of
basic, it's like a Kneser–Ney character gram model. The procedures are known. We're doing basically
either coarse-to-fine inference or beam search in the model. What's interesting is that in the
emission model you can embed prior knowledge about the printing press. You can kind of make it a
cartoon of the printing press as I mentioned, modeling things like baselines of text and inking and
stuff like that. And I mean it's unsupervised learning problems like decipherment the more prior
knowledge you put into the model and the less details you have to learn from the unlabeled data, the
more effective it will be.

</turn>


<turn speaker="Matt Gardner" timestamp="">

I guess, I don't know if this actually made it into your thesis. I don't, I don't know what your
thesis title was, but in your PhD you had a series of papers that introduced particulars of the
model to handle like the inking and the baseline and all of this stuff. And I'd encourage listeners
to go look at those papers that kind of interesting and so in the learning some interesting things
there. I think we could move on from the particulars of this model. How well does it work? Can you
actually get reasonable OCR on documents from this?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

It works pretty well. It works well enough that and a couple of larger projects that I'm working on
right now where we're doing the next stage of trying to do computational bibliography in some sense
we are analyzing books as artifacts, as material objects and trying to say things about their
history. This isn't that we're using is this system. I'll mention a couple of reasons for that in a
second, but how well it works of course depends on the domain. There's a huge diversity in
difficulty and types of difficulty of historical documents. In our evaluations we focused on two
pretty well known data sets. One is the old Bailey Corpus, which is a cool data set. It's these
proceedings of the old Bailey courthouse in London as entertainment for the population. They would
take the most extreme cases and write little Synopsys of them of the, of the rulings and then give
them to the public.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

I think like weekly or something like this and this goes really far back into the early modern
period and on on that data across a hundred or 200 year period, we found that we were getting on
average, I think if I recall correctly, kind of like 90% character level accuracy and depending
maybe like 80% word level accuracy if you compared it at the time with the kind of most widely used
system ABBYY FineReader, it was a pretty big improvement in performance. Like maybe ABBYY FineReader
was getting like 50% of the words right and we were getting like 80 these are rough numbers and they
probably change now. Like ABBYY FineReader is updating all the time. We also looked at historical
newspapers, which are harder in some cases because there's oftentimes like they've been more damaged
with time or there's been more type setting noise.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

We were getting similar numbers there and systems like ABBYY FineReader were getting maybe like 50%
of words right. So definitely for the periods that we looked at, we were getting market
improvements. However, in practice I would say that this kind of unsupervised system can be more
fragile if something goes wrong with its interpretation of the fonts. Like it doesn't kind of learn
to segment characters because maybe there was a huge amount of overthinking or maybe you have a font
with a ton of ligatures, then everything goes wrong. So you'll go from like 80% accuracy to like 20%
accuracy.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Can you explain what a ligature is briefly for people who don't know?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yeah, a ligature, you can think of it as co articulation in speech. So for certain character bigrams
T in an H when they appear next to each other, you might have a special stamp for the T and the H
together that actually connects their glyphs and the glyphs might change because you know the H is
following a T or vice versa.

</turn>


<turn speaker="Matt Gardner" timestamp="">

I think this is most common in modern fonts for like FI. It's really noticeable there,

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Right? Yeah. FI is, the classical example. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

So are you able to get good language models for this type of historical documents or is it hard to
find data to train such models?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

It can be hard. Again, depending on the domain. What we found was sort of surprising is that the
language model doesn't matter as much as you might expect. I did a lot of work on trying to get the
most efficient, highest capacity, character model we could get working with full inference in the
system and it turned out that you know, going beyond a six gram character language model didn't help
performance substantially slowed things down and sometimes introduced areas because the inference
had to become more approximate. I think there's kind of two reasons for this. One of these is the
domain mismatch. If you don't have perfectly in domain text data to train the language model on and
you're using a really high capacity language model, you'll overfit to the domain difference and that
will hurt your performance and so maybe a six gram model if you're training on modern New York Times
data is all you really want to learn about modern New York Times data.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

If you're going to then use that language while on old school text. Now what if you do have in
domain data? Well, even in that case we saw you got summed gains from, using it, like take old
Bailey manually transcribe as much as you can and then split it in half and use the transcribed data
as your training data for your language model and then try to, you know, do OCR on the other half.
You get some gains from that, but it's not as pronounced. I forget the specific numbers, but my
rough guess is you might go from word level accuracy of 80% so maybe 85% on some things and that's
because the core of the problem is really the emission model. Once you have a pretty good idea of
what each character shape looks like and you can recognize them, then you don't really need much
more than a simple language model to recognize the messed up characters that appear every so often.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Like think of it like a closed task. Like suppose you know every character in a sentence except for
one and you're trying to predict that masked character. How wide of an Ingram context do you
actually need for that? Probably not that big. Like you almost just need a dictionary, right? In
fact, like older school systems like Tesseract don't really use statistical language models in the
sense you might be expecting, they kind of use like word white lists, vocabulary. Where are you just
saying let's stay in the vocabulary, otherwise we don't care. So a lot of the difficulties mostly on
the admission side.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Interesting. So when it comes to the emission model, does it help or hurt to include data from in
your unsupervised model training from multiple printers? Right. Because each of the different
printers will have its own artifacts.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Really good question. When you're doing supervised learning, you don't like the notion of
overfitting and generalization doesn't quite mean the same thing. In theory. You could train this
model independently from every other part of your dataset on a single page. Like you could learn
parameters just for a single page, the single page you want to test on. So if you have data from
multiple printers and multiple fonts, there's not really a great reason to train on all of them
jointly unless, you kind of need more than a single page to pull statistics to get a good idea of
the font. What we found is that a single page is kind of sufficient if your model set up correctly.
Most characters in the alphabet will appear on a single page and the ones that don't are rare by
definition and often the language model can figure them out if you have the rest of the font figured
out.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

So training on a single page seems to work fine and so there wasn't really a need to pull between
different fonts and printers and things like this.

</turn>


<turn speaker="Matt Gardner" timestamp="">

That's really interesting.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yeah. The more common scenario though is that you actually want to transcribe an entire book and a
book is usually printed at the same printing house using the same type case and usually was scanned
at the same time. So it has the same kind of scanning noise. So it makes more sense is to just try
pulling statistics on a book and you can get some improvements that way. But again, not as
pronounced as I would've expected. This may also be an artifact of the, of this kind of unsupervised
model. I don't want it to sound like I'm saying that, you know, generally better language models
aren't helpful for OCR and supervise OCR of other kinds of models.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

They may be extremely helpful, like maybe you want like a huge neural model, but for this
unsupervised setting it didn't seem as helpful as you might have thought.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

So I'm wondering how much of sharing of parameters do you think is necessary or useful when you're
modeling different sizes of the font of the same, maybe in the same book or again, on the same page?
Parameter sharing was absolutely critical to get the kind of original model here to work. It's sort
of subtle and at first it seems sort of stupid, but I like it. So you could imagine one naive way
that you deal with not knowing the character segmentations ahead of time, right? Which means that
you don't know the width of each character in your font ahead of time. Is just to say, well we have
a separate set of parameters for G when it's 30 pixels wide for G when, it's 31 pixels wide for G
when it is 32 pixels etc.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Right? And so now you can effectively learn K different GS where K are the number of widths you're
allowing the model to consider. That's clearly a bad idea because you might like learn A is one of
your K different Gs and it gets all confused and you can't actually get OCR out of it. So you
clearly want to share between different widths while the model is still uncertain about widths the
next most naive approach is you say, well we have one big G template, our kind of grid of weights
for the density on ink. Whenever you're inside the G and if you're generating a thin G cause you
think maybe these are thin or maybe you're at the binding of a book where the page kind of receives
away from you in the Z dimension. So things kind of get compressed a little bit. You're generating a
thin G, just stop early, go through your template left to right once you get to, you know K pixels
in the width of the thing you're generating, just stop.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Okay, so you are doing some parameter sharing there, but you're doing in kind of the wrong way.
You're saying that like different widths of Gs, all's chair like prefixes of their shape, which does
bad parameter sharing to you throughout learning. If you peek at the templates you get out of that,
you end up with these sort of Gs that are split in half and you're kind of learning a really skinny
G and then all of a sudden it transitions to a big G and it gets all, all kind of just continuous.
So here's what you really want and this is probably obvious now given this lead up is you want to
say we have one big G template that is in some sense widthless. Okay? It is like what G would look
like if you stretched it to a hundred pixels wide, no matter how wide it is in reality.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Okay? Now when we generate from that template, we pick a width of the actual token we're going to
generate and then you apply some kind of convolution essentially to downsample your super wide G. So
the width that you're trying to generate and when you backdrop from that, you now kind of propagate
into all pixels of your template regardless of the width you're trying to learn and so you share
parameters in a smooth way across all that widths, that was like the most critical thing to get this
to work. The same reasoning applies to inking to offsets, to all these other things you want to
share as much as possible into a single representation of each character in the font.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Yeah, that's a very cool insight. Thanks.

</turn>


<turn speaker="Matt Gardner" timestamp="">

so coming back to something you hit on earlier, there are, as you said, some interesting learning
problems, some reasons to think this problem is interesting, not just from a historical document
analysis perspective, but also from a just fundamental machine learning perspective. Do you want to
talk about that for a bit?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yeah, sure. I can talk about, this is one of the reasons I continue to be interested in this
problem. Apart from just the application side is also really cool. So like my group is both
interested in the downstream applications and cares about history and things like this, but we're
also kind of half a ML NLP group. And so problems that kind of serve double duty like they have
interesting applications that we care about but also are great playgrounds for new machine learning
are ideal in our view. And this, this I think is one of them. This is oversimplification, but my
views to some extent is there's kind of two different ends of the modeling spectrum. And this might
sound weird for a second, but at one end you have things, let's say particle simulation or like
simulating physical processes for which you really know all the underlying rules, like you know,
either Newtonian mechanics or kind of quantum physics to the extent you want to put it in your
model.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

And really what you're doing is inference. You're kind of setting up a system that you know, the
causal processes that allow it to unfold. And then you're watching what happens so you can draw some
conclusion from it. That's kind of at one end. At the other end you have things like image
recognition or machine translation where the rules of the process of going from a sentence in
English to a sentence in Spanish or going from a picture of a cat to the decision that it is in fact
a cat. The underlying process there is is what? Well, it's really the, it's the human brain, right?
Like that. It's some kind of perceptual process that we have some vague understanding of, but we
really have no general satisfactory causal understanding of right, and so what do we do in these
cases? What we do, we don't write down the rules of the system.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

We don't know them. It's not directly an inference problem. It's a learning problem. Instead we go
get a whole bunch of labeled data where we just caught humans doing the thing that we want to model
and we got so much of it that we can use it to inform a really high capacity neural model that we
train on that data and that works great. You know, but we kind of don't really know what's going on
underneath the hood, but it works for cause they have so much data. So you inform your model either
with prior knowledge or you inform it with supervised data. Kind of two extremes, right? The kind of
unsupervised learning that I find the most fun to some extent is right in the middle. It's where you
know something about the causal process, but there's a lot of details that are either very difficult
to specify or you just don't know that you do want to learn from data.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

And so historical OCR, especially in the early modern period kind of satisfies that. Ideally you can
build these cartoons of the printing press. You're not actually simulating the atoms in the printing
press because that would be impossible. Not worthwhile. Right. But you have some vague cartoon, you
kind of put in the things that I was talking about, like a notion of regularity and notion of inking
and stuff like that. And there's a bunch of stuff you don't know and now you try to use machine
learning to learn that from data. And it's this kind of interplay of what we know in advance that we
embedded in the system through modeling assumptions of what we don't know we try to learn with high
capacity model. And so the model we've been talking about I think isn't perfectly balancing those
two ends is much more on the statistical cartoon side.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

We're kind of relying a lot on what we know about the printing press and learning only a little bit
just to separate the front from the data. But if you wanted to generalize this kind of approach to,
I don't know, like historical handwriting or even older weird documents. There's this kind of class
of documents that are handwritten but are like medieval manuscripts but are so carefully handwritten
that they're, they're kind of in between handwriting and printed stuff because they're so regular
and other written for those, you could probably learn how to do OCR on them using a similar model,
but because there is some variance within each character type just like the variance of, the scribe
as they're writing it and that variance won't look like simple overexposure underexpose or shifting
up and down. There will be some kind of nonlinear warpings there.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

You really need to have some kind of neural net in your model. You need to have some part of the
model's parameterization that can learn those kinds of difficult nonlinear transformations with out
you specify them by hand. And so I think that the interesting machine learning problem is how do we
do that? How do we have both a high capacity neural model in the module that, that we need it, but
at the same time allow yourself to specify these strict conditional independence assumptions that
inform the model of what we do know in advance and you can think, I mean this is kind of the problem
more broadly in machine learning right now, like you see papers going back and forth on both ends of
the spectrum. We have super high capacity models that can learn if you give them infinite data
perfectly right. And then we have models that are very rigid but embed a lot of prior assumptions
and we're trying to get both. But it's difficult to both have interpretable modeling assumptions and
high capacity neural models in the same system.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah, I like that framing of things. So you talk about OCR as a general class of problems where you
can get an interesting trade off here. Have you thought of other classes of problems where you see
the same kind of trade off between like knowing about the underlying process versus needing to learn
from data?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

All NLP to some extent like like we know linguistics, I don't think you can really call it a causal
process in the same sense that with the printing press we're modeling the physical process that
produced our data, but there's a lot of commonality like there are cross cutting properties of
language that we know from hundreds of years of linguist looking at human data and thinking about
language data that we should ideally be able to inform our models of. Why require them to learn it
directly from raw data, but at the same time we know that most of the linguistic formalisms we have
break down at the edges on you know, Twitter data or kind of whatever domain data you're talking
about and rule based systems of old are super brittle and don't scale and have a lot of issues and
so across NLP, like a problem of your choice.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

You can imagine putting syntax in. It seems like a good idea. In recent years we've been seeing a
lot of gains without doing that and there's been some controversy like, well maybe we don't need
syntax for anything. Maybe we just need tons of data. My feeling is like that's true if you have
tons of data, but for some of the most applications you don't, either it's expensive to collect or
kind of impossible to collect in some sense it's like I'm thinking like kind of grounded semantics
research or semantic research in general. It's hard to get humans to write down their internal
formalisms or give you direct annotation for it, so you kind of only get indirect supervision.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Thanks. Those are interesting insights, so I think we've hit on historical OCR why it's hard, how
you solve the problem, why it's interesting from a machine learning perspective. I think we could
spend the rest of this time on what you're doing now, which is what interesting things can you do
with this given a reasonably performant historical OCR system?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yeah, totally. It's one of the thing I just want to say is I'm not a historian. I'm not a
bibliographer, so everything that we're kind of doing more on the applied side, we do in
collaboration with some expert in the field. One of the things we did a couple of years ago. It was
kind of the first step for our group in this line of work was tackle a task called compositor
attribution, which is probably opaque without further explanation. First, let me tell you a little
bit about historical printing and how it works. In the early modern period, the documents were
printed at these printing houses where they would have a printing press or maybe a couple printing
presses. In order to do that, as we talked about, there's people, workers at the printing house who
are taking the type, like the little metal stamps, assembling them and then printing it and they're
doing this in parallel because they want to do it quickly.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

So they'll take the manuscript that they're supposed to make a printed book out of divided up page
by page amongst a bunch of workers. Each worker is responsible for setting the type for some subset
of the whole book. At the end they put it all together into the actual product. Okay. Now at that
time, these workers, which are called compositors, took a lot of liberty with their transcription of
the manuscript into the printed form they were about to make a printed page out of. They were
balancing a bunch of constraints. One is they're trying to get the spacing right so that you know
they don't have too much white space at the end or they kind of don't stop at a certain point in a
sentence. They are making up their own spellings to some extent because spellings weren't really
standardized at the time.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

There maybe in some cases worried about running out of a particular stamp on a given page and I'm
not 100% sure about that one. So they're kind of satisfying all these constraints and injecting
their own biases into it. And the result is that, you know, whatever the original manuscript were, I
was like, imagine when a Shakespeare's plays, what you actually get in the printed version is an
edited version. Compositors are known to have done things like delete words, change words, delete
entire sentences, paraphrase sentences, respell basically every word, change punctuation, change a
question mark to a comma, all kinds of stuff. It'd be like if your inkjet printer, laser, printer or
whatever decided like it was going to, you know, actually fundamentally change the text you're
trying to print, which will be kind of scary.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Can I clarify something? Do you have an original manuscript that has pages? Are you saying that I
take a manuscript page and I say you composite or you do this page and then I give the next page to
the next compositor so that like the compositor has no flexibility to like re-paginate.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

That's right. So the humanities effort that we did this in collaboration with was Hannah Alpert-
Abrams who's not the NEH, and this is also with my student Maria Ryskina, and Dan Garrett and she
told us a lot about this process. I've forgotten some of it, but there's this notion of, I think
this is right, you're, you're printing on kind of like a bigger sheet of paper that when divided in
half gives you essentially four pages. So the backside, two pages, the front side, two pages, that's
going to be folded into some segment of the book. Right. But across the fold on that page, those
pages aren't going to be consecutive because there's going to be other folded pages that go in there
and get stapled or bound together. And so that I think was the kind of guiding constraint behind who
got what.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

They wanted to make sure that you were printing a set of these larger pages that were coherent so
everybody could get folded together at the end. Well yeah, they weren't like choosing which page.
They weren't going in order. Like they did some assignment process and then they printed it in the
end and all got assembled.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Wow. And so what were you trying to do? You were trying to decide, given a page who is the
compositor?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yeah, so why might you care? Well, it comes back to the editing process. Shakespeare's first folio
is the document that I think has received probably the most study along these lines. The reasoning
being that we're interested for historical reasons in kind of what the original forms of
Shakespeare's plays were as they were performed historically and contemporaneously with Shakespeare
as they were written by him in a manuscript.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Those have been lost for the most part is my understanding. What is left is all these noisy
duplicates from the printing press noisy because of the composite. Now as we've talked about, you
know, composites are putting their kind of personal preferences in and each compositor therefore has
kind of different biases and different levels of noise. Okay. There are also kind of multiple
iterations of printing Shakespeare's work. The first folio is the first collection of printing of
his work, but there are later additions as well where they were reprinted from different sources and
stuff like this. So if you're looking at the first page of Hamlet, okay. And you want to know the
first quote of Hamlet in the whole play and you're looking at Shakespeare's first folio and you see
something where it ends in a question mark and you're like, I think probably this was a question
cause it says on the first folio, but we know the compositor sometimes change out periods for
question marks Willy nilly.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Was that really in the performance of the play? Was that phrased as a question or was it phrased as
a statement? Okay. Then you're going to ask, well this compositor the one who printed that page.
What other pages do they print? Do we have better information about those pages so we can see
whether this compositor was noisy? If they were noisy, then we probably don't trust the first folio
if we're trying to figure out what the first quote of Hamlet was, we might want to look at a
different edition. So that's why it's of interest. It's also of interest because compositors are
kind of these silent unacknowledged workers of the printing press era that had some editorial say
but are often unnamed and unknown. So the extent to which you can kind of track them and what are
doing. I think historians have told me that's of interest for historical reasons.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

So the task is you get all the images of all the pages of Shakespeare's first folio, the first
printed edition of all his plays. There's kind of multiple versions of the system. The first version
is you say there are K compositors, let's say there's five of them. Why five? Well you can go back
and look at manual bibliographers what they predicted for the first folio and use that as a rough
guess. Now we build a generative model that says each page is going to pick from the set of
compositors each compositor has a bunch of parameters that determine that compositors behavior and
then you go from the text of a collated modern edition, which you think of kind of canonicalising
standardized through the compositor which is partially a string transducer and partially kind of a
visual spacing model. Since that was also part of their behavior to generate the data.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

And then you run this like a clustering model and when you get out is an assignment of pages to
these different sets of behavior parameters and then for Shakespeare's first folio, because it was
studied so heavily by old school bibliographers, we have a bunch of guesses of the kind of what
probably the correct attribution is and so we can compare and so if you build this model using the
same features that they were looking at, and you can think of it kind of like manual detective work,
some of them are visual, some of them are orthographic. What we found is that you get roughly the
same predictions. They're kind of like an 80, 90% accuracy level. Now that's not to say that this
means we're 80 or 90% correct about history. All this means is that if you embed the same
assumptions that manual bibliographers did you get the same predictions whether or not they're right
is that, you know, I can't really weigh in on that.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah, that's really interesting. You were telling us about constraints on one compositor doing a
particular set of pages because of the way that the page would be folded and actually inserted into
a book. Can you inject those assumptions into your modeling process?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

You definitely could. And we wanted to though it's a huge pain because you have to go back and now
kind of reconstruct the physical organization of the book you're talking about. And we were
operating directly with document images though. You probably could kind of figure that out that that
would be like, I mean that's something we talked about and it would be really cool to do.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah, that's a really interesting project. Any others you want to tell us about?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Yeah, so something that we're working on now, and this is part of a larger NSF funded project with a
collaboration between my group UCSD and then Chris Warren's group who's in the English department at
CMU and the Max G'Sell's group is in the stats department at CMU. It's called print and probability,
which I like as a title. And here it's kind of like compositor attribution, but it's larger scale.
And more interesting. In some ways. We're trying to do printing house attribution for as many
documents from the early modern period as we can get our hands on. The reason why this is
interesting is that, I mean there's a whole bunch of political and historical stuff going on during
this time period. There's a lot of change. In some sense the, invention of the printing press was
one of the driving forces behind the Protestant reformation because you can start disseminating
information in a new way and it's had a lot of effects. So printing of documents was tied with these
political issues and with political persecution and a lot of interesting ways and during certain
time periods there was a lot of thought going on about freedom of press should press be free so it
would be allowed to print whatever we want, not just write whatever we want because you know, you
can write a manuscript and no one reads it, but print whatever you want because there will be, you
print a bunch of people are going to read.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

That's more dangerous. That's kind of more visible to the powers that be, you know. And so at the
time a lot of thought about and arguments for freedom of press and things like this were themselves
printed and disseminated. But because at the time printing wasn't free, you could get thrown in jail
or beheaded for printing something controversial. Printers who were supporting this were very afraid
of associating their names with these documents. So there was a lot of what's called clandestine
printing pamphlets and documents and little treatises were printed in secret without the printers
insignia on it. And then distributed, which was also dangerous. And we still have a lot of those
today. One really interesting example that Chris Warren has told me about and kind of is one of our
focusing artifacts for this project is called Areopagitica. It's a pamphlet written by John Milton
about freedom of press.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

And this is the kind of it brings, shows you the irony, right? It's a, it's a document about freedom
of press being important and yet it's printed secretly because they're worried about getting
persecuted. The printer, the person who actually stuck their neck out and printed this secretly is
still unknown. Right. There's a lot of theories about it but still unknown. And so there's been a
lot of historical debate like who printed this went to the printing house at the time might've done
this and stuff like that. Now. Okay. We get to the kind of the computational side. So how do
historians actually try to do that kind of attribution, like looking at images or actually looking
at the original physical artifact of a printed pamphlet or book and trying to come up with evidence
that lets you make a case for it having been printed by this particular printer in this particular
printing house?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Well again, kind of like in the case of compositor attribution, it looks like kind of manual
detective work. Okay. So the biggest cue that I know about that Chris has told me about and kind of
prior bibliographic work is to find instances, individual imprints of stamps within the book that
came from a metallic stamp that was damaged in some way. Right? A priori, like within a given time
period. Within a given kind of city. The printing presses are going to be using fonts that look
very, very similar. So just knowing what the underlying shape of a G looks like in this particular
book might tie you to a time period and location, but it's not going to tell you the printing house.
Okay. But as soon as that G the metallic stamp becomes physically damaged, like it gets cracked
somewhere or it becomes warped, it becomes like a fingerprint.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Right now whenever you see that particular kind of damage, you know it came probably from the same
physical artifacts. All right. And so you say, okay great. So now maybe we can say these two clan
and destiny printed documents came from the same printing house, but how do we know the printing
house itself? Well, the answer is pretty presses were rare and precious. It's not like there were
separate printing presses for secret documents and separate ones for not secret documents. I
imagined in my head that it's like at night they're using the same printing press or printing a
local newspaper to print these secret documents and then distribute them. So there's a lot of
documents out there with the printer insignia on them and probably every printing press that we care
about has some documents that is labeled with the printer. If we can find a damaged glyphs in common
between Areopagitica for instance, and a newspaper or a book that wasn't controversial at the time.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Now we have strong evidence that it came from that printer and so that's exactly what kind of these
historians have done. They've gone through by hand, looked at individual character bounding boxes,
tried to collate across works that they, they thought probably shared a printer and did this all
manually. There was an entire PhD thesis on this and so the project we're working on is basically
thinking about can you use AI and machine learning to scale that same reasoning process, right?
Sorta like the compositor attribution. We're going to use their same underlying assumptions, the
same types of evidence, but now we just want to do it at scale so you can not just look at the
couple of ones you found in a book and look at the couple books you thought were relevant. You can
do this for all books in the Eva collection, which is like one of the biggest collections of images
that really modern documents.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

And you can think of this as like, it's also kind of a network problem, right? So there's kind of
multiple stages. You want to first identify all the character bounding boxes. And so these, the
unsupervised OCR systems I was talking about are great for this because they are kind of directly
doing the segmentation directly, trying to shift characters up and down to align them. So you can
use them to extract our kind of conical versions of, of each character within a document. Then you
and identify which ones of those are damaged in an interesting way, which is a vision problem that
we don't have a lot of supervision for. So can you this unsupervised. And then finally you want to
expose for each artifacts in your collection, the set of stamps that you think were present are used
to print that document and now try to cluster them across all documents.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Maybe injecting some prior knowledge that, you know, these two printing houses, shared type between
them, these ones did not. This document probably didn't come from this one and do some kind of graph
clustering problem on top of that to figure out the printer assignment. Ideally this should be a
joint process and you should kind of iterate and then kind of what you're finding in the network
problem informs, how you do the recognition and similarity problems and informs how you even do the
OCR. And so that's kind of the longterm direction for that project.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

That's pretty cool. A quick question here, how many printing houses in total or are we talking
about?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

That's a good question. Yeah, I don't have a great answer to that. It kind of depends on the time
period and this problem, it doesn't occur just in one decade, right? It occur like you have secretly
printed documents over hundreds of years and so at a given time we'd have to ask Chris, but like
what I have in my head is that we're considering like maybe 10 to 20 printing houses at a time
within some span.

</turn>


<turn speaker="Matt Gardner" timestamp="">

This is fascinating. The main thing I thought about as you talked about both of these projects is
that again, from a like why is this an interesting machine learning problem? It's because
interpretability here is key. These problems don't have answers. And so if you have a machine
learning system that makes a prediction and doesn't say anything about why it made that prediction,
it's just gonna be totally ignored. It's useless, it doesn't, it doesn't do anything at all. In
order for this to actually be useful, it has to be interpretable in some sense. And this is, this is
fascinating,

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Right? What you're actually looking for is the model's interpretation. And do you want that
interpretation to be based in understood assumptions? The only way you can do this kind of research
is to kind of specify your assumptions and then follow some deductive chain. And then the answer you
get out is kind of conditioned on the assumptions. It could of course be wrong, cause we'll never
know the true, the truth about history, but we can kind of come up with different versions of it
based on the assumptions we put in. And so yeah, that's super important here, but at the same time
you still have all the other issues with AI. Like we have tons of noise, we're talking about like
complicated distributions that it's very hard to directly write down. So we want the power of full
neural nets and the monitor machine learning is how do you balance those two things and that's what
makes it extremely interesting to me from an email perspective.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah. Yeah. I feel like it, I did a whole lot of listening this episode, but this is stuff I haven't
thought about very much. It's really interesting to hear you talk about them they are some really
interesting problems. Thanks for talking about it. I think we're close to done here. Was there
anything you wanted to talk about that we didn't hit on or any final thoughts?

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

We've talked a bit about historical CR. I just want to like shout out to some other groups that
there working on that as someone who knows a lot about historical OCR is David Smith, he's done some
work on, on statistical models. He has this really cool thing where you do collation and OCR post
correction at the same time, so you get a bunch of different noisy OCR is at the same text and then
use a neural model to bring them together to correct errors which is just cool. He's also part of a
couple of bigger products that are trying to establish the current state of OCR on historical
documents, like where the challenges are, what the important use cases are, where do we need to put
more effort, how can we bring the community together, and there's a public synopsis of that work on
his website. For anybody who's injured, what's the state of historical OCR? How what, what should I
use if I want to do this? I would, I would start there.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Great. Thanks. This has been really fun.

</turn>


<turn speaker="Taylor Berg-Kirkpatrick" timestamp="">

Cool. Yeah. Thank you guys for inviting me. It's super fun.

</turn>
