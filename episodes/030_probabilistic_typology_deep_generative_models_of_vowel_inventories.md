---
title: "Probabilistic Typology: Deep Generative Models of Vowel Inventories"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "030"
tags: []
description: "Paper by Ryan Cotterell and Jason Eisner, presented by Matt. This paper won the best paper award at ACL 2017. It's also quite outside the typical focus areas that you see at NLP conferences, trying to build generative models of vowel vocabularies in languages. That means we give quite a bit of set up, to try to help someone not familiar with this area understand what's going on. That makes this episode quite a bit longer than a typical non-interview episode.

https://www.semanticscholar.org/paper/Probabilistic-Typology-Deep-Generative-Models-of-V-Cotterell-Eisner/6fad97c4fe0cfb92478d8a17a4e6aaa8637d8222"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F345542301&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

Okay. Before we get started today, I thought I'd explain at least a little bit of why it's been so
long since we posted an episode. I guess I was on vacation for a few weeks Waleed was on vacation
for a few different weeks. I was sick for a couple of weeks such that I didn't even make it to ACL.
I switched teams. We released this Allen NLP tool kit that I was working on a whole lot. Waleed has
been working hard on this semantic scholar launch, some new features that will be coming out
shortly. And so we've just had a crazy summer, but we are back in business and are hoping to have
some more regular episodes here now. We're thinking that we want to focus a whole lot more on
interviews and our episodes I think will almost exclusively be interviews. We'll occasionally do
some individual papers ourselves still, but it's just more interesting to have a conversation with
people about papers. And we'll do as many of these as we can find people that are willing to talk to
us. So probably two per week. We'll try, we'll see how that goes.

</turn>


<turn speaker="Matt Gardner" timestamp="01:18">

Okay. So today's paper is the best paper at ACL this year. It was titled Probabilistic Typology:
Deep Generative Models of Vowel Inventories, by Ryan Cotterell and Jason Eisner at Johns Hopkins
University. So I thought this paper was really interesting and to set the stage here, I think we
should talk about natural language processing versus computational linguistics. I don't know if
everyone thinks about it this way, but the way that I like to think of this is; these are like two
different groups of people. NLP people are computer scientists who want to see what we can get
computers to do with language. So they focus a lot more on end tasks and performance metrics. And
can we get computers to answer questions or labeled part of speech tags or parse sentences or do
whatever you want with language. On the other hand, there are computational linguists who are
interested in studying language as a phenomenon and they use computational methods in order to study
language, but their goal isn't so much to get computers to answer questions, it's to see what we can
do with these computational methods to get more insight into how language works in people. And
there's a lot of overlap in the methods that these two groups use. And so we talk to each other and
go to the same conferences. But really there are two very different kinds of aims between these two
groups.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:53">

Yeah, I think it makes a lot of sense to make the distinction clear between the two. But I don't
think terminology used is standardized. I think many people use computational linguistics to refer
to the NLP kind of problem. Like actually like more of engineering like more practical applications
for linguists.

</turn>


<turn speaker="Matt Gardner" timestamp="03:15">

Yeah. Maybe the better way to say it is, are you approaching this NLP computational linguistics
space from the perspective of a computer scientist or from the perspective of a linguist. And I
don't know, it seems like almost all of the papers that I see at ACL and EMNLP are the computer
science side. We care a lot more, most of the time about practical applications, about building
models, about pushing numbers up maybe to the detriment of good science, but that's a different
discussion. And that there are very few papers that you actually see that are actual linguists
trying to study language in ACL conferences, even though it's called the association for
computational linguistics.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:59">

Yeah. So the number used to be much more the latter like trying to study language and over the years
incrementally become more and more infrequent, which for me, I'm inclined to, I'm actually an
engineer at heart. So I actually prefer to read papers that have a practical application, but I know
that like there's also a lot of value in linguistics work.

</turn>


<turn speaker="Matt Gardner" timestamp="04:29">

Yeah. So this paper that we're looking at is very squarely a linguistics paper and it's studying
language. And actually from what I could tell, like I, I'm not a phonetician, I haven't studied this
very much, but from what I could tell from reading the paper, it makes a significant advance in the
field of linguistics that we're going to talk about. And to me, I think that's probably why this
paper got picked as the best paper, because it reminds all of us that actually people in our
community care about language and it's a nice reminder and it's a really nice paper. Also it's not
just, Hey, here's some new linguistics, the way that they made this advance in linguistics was by
taking modern statistical tooling and applying it in intuitive and nice ways that we'll talk about.

</turn>


<turn speaker="Matt Gardner" timestamp="05:20">

Okay. So what this paper is actually looking at is something called linguistic typology, I looked up
the definition of this on Wikipedia, just to have a nice, concise definition. This is: a field of
linguistics that studies and classifies languages according to their structural and functional
features. It's aim is to describe and explain the common properties and the structural diversity of
the world's languages. So we have somewhere over 7,000 languages in the world that have existed that
we know about. And so this tries to form some kind of typology or hierarchy or categorization of the
phenomena that we see in language. And in particular, this paper is looking at phonetic topology.
And even more particularly than that, they're looking at vowels. Phonetics is what sounds do
languages use, including vowels and consonants. That's a little bit too much for the models, I
guess, that they looked at in this paper.

</turn>


<turn speaker="Matt Gardner" timestamp="06:17">

Also, I think it's for some technical reasons there probably isn't as much data to look at. But
they, so they are focusing on vowels. So which vowels show up in a particular language and why. Is
there some underlying distribution that these sets of vowels come from? So if you think of all the
different vowels that you can produce, it's by making different shapes of your mouth and your vocal
tracks doing different things. Again I'm not a phonetician, but it turns out that some vowels are
easier to say than others. And if vowels are really close together, they're harder to distinguish.
So you can think of these notions as giving some intuition for which vowels you might expect to see
in a particular language.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:10">

So we're seeing which vowels are just, we have a discrete set of vowels that we're talking about.
But I think about as a continuum of sounds and I'm not sure if the paper was discussing this as a
discrete or as a continuum.

</turn>


<turn speaker="Matt Gardner" timestamp="07:27">

Yeah, that's actually a really interesting point and there's some nice discussion in the paper about
dealing with this and I think we'll get to it a little bit in more detail later. For now, just
imagine we have a discrete set of vowels. In particular there's the international phonetic alphabet
and they have a list of some tens of discrete vowel symbols that represent different sounds in
different languages and are roughly constant. Like it's roughly the same, one sound or a small
clustering of sounds, maps to a particular discrete symbol that we're going to actually use.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:04">

Okay

</turn>


<turn speaker="Matt Gardner" timestamp="08:07">

So what we're going to do it with this discrete set of symbols is try to decide which ones show up
in which language and why. Remember we're looking at phonetic typology. We're trying to understand
why groups of vowels occur in a language. If we can come up with some model of a generative process
for how vowels show up in a language in some sense then, and it matches what we actually see in
tested human languages, then that that tells us that maybe we actually understand something about
this process of how vowels come to be, how a particular vowel set arises in a language. Just like in
physics for instance. If I can write down a simple equation that actually predicts what's going to
happen in some physical system, that means I probably understand at least to some extent what's
going on in that physical system. We can do the same thing with language. If we can get a decent
model that explains or predicts what we actually see in human languages, maybe we understand
something about what's going on in this phenomenon. We call language.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:08">

So if we do a good job modeling this, we should be able to say it's unlikely that these two vowels
would appear in the same language.

</turn>


<turn speaker="Matt Gardner" timestamp="09:16">

Yes.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:16">

And we don't condition anything about the language. We don't have texts or don't have like the
consonants. We don't condition on anything here.

</turn>


<turn speaker="Matt Gardner" timestamp="09:24">

No. not really, condition on anything...

</turn>


<turn speaker="Waleed Ammar" timestamp="09:30">

About the particular language we're modeling.

</turn>


<turn speaker="Matt Gardner" timestamp="09:33">

Yeah. It's just, they show some experiments where like, given four vowels, try to predict the one
that's held out. So, but yeah, this is the generative model of the set of vowels that show up in a
language where that's the only thing they're modeling. No, other condition. Okay. So to try to model
this phenomenon, what the authors did here was look at linguistic theories about how vowels show up.
And I think I briefly alluded to two of these earlier in this discussion, just a little bit one is
called focalization, which essentially is some vowels are easier to say than others. And so are,
thus apriori more likely to show up in a language because they're easier to produce. Sorry, any
linguists if I'm butchering this, but that's how I understood this term. Next is dispersion, which
is essentially if I have two vowels in a language, I should be able to tell them apart, both as a
speaker who needs to produce distinct sounds to make different phonemes. And as a listener who needs
to decode different phonemes based on some acoustics.

</turn>


<turn speaker="Matt Gardner" timestamp="10:47">

So you put these two things together and you get something called dispersion, focalization theory,
which is, at least as this paper says, the best explanation for phonetic typology that we have in
linguistics so far. And then what the paper does is says, Hey, we can actually encode these
intuitions in a probabilistic model that we can fit from a bunch of data and shows how to do that in
a nice way. So what do these models look like? Remember that we're trying to, what we have is a set,
a discrete set of vowels, possible vowels that show up in a language and each language has some
subset of these attested. And so what we need is a model over subsets. Turns out there are these
things called point processes that are models over subsets. And I'm not gonna go into too much
detail on the math, but the paper shows three different point process models that capture
increasingly rich interactions between the vowels in the subset that is drawn.

</turn>


<turn speaker="Matt Gardner" timestamp="11:53">

The first one is called a Bernoulli Point Process. In this model each vowel gets a score independent
of every other vowel in the subset, which essentially just means I can find which vowels are most
common. And I can assign a probability distribution to the subset based on what vowels are there.
And if you remember the terms from before this captures the focalization intuition that some vowels
are just easier to produce and so should show up more often. The Bernoulli point process can capture
this. The next point process that they talk about is called a Markov Point Process. And this
introduces a pairwise interaction term between all pairs of vowels in this subset. And what this can
do is say a model, at least to some extent this dispersion criterion which is that two vowels
should, that vowels in your set should be far apart in some kind of perceptual space so that you can
easily distinguish between the set.

</turn>


<turn speaker="Matt Gardner" timestamp="13:00">

It only allows pairwise interaction. So it's not a complete model of this but it actually lets us
model at least a little bit this dispersion phenomenon. The last model they use is called a
Determinantal Point Process (DPP). And this is much more complex. It allows much richer interactions
between the vowels in the subset because the probability of the subset is proportional to a
determinant of a matrix of vowel embeddings, essentially you could think of it like that. And the
determinant function lets you have just a richer set of interactions between all of the vowels in
the set.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:39">

So this is my first time to see a NLP paper or composition linguistics paper that uses a DPP. The
determinantal point processes. Have you seen other papers using this?

</turn>


<turn speaker="Matt Gardner" timestamp="13:51">

I am not really familiar with point processes at all, sadly so this was all new to me. There are
some references to other work that does similar stuff, but it's not work that I had followed. So
yeah, it's new to me.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:05">

I know that several people At CMU were trying but no success stories yet.

</turn>


<turn speaker="Matt Gardner" timestamp="14:11">

Interesting. so these are the models that we're looking at. Point process models that capture
subsets of vowels. And now what we need to do is learn these models, given some data. I'll leave
details about inference algorithms and how you actually learn parameters for this to the paper. It'd
be hard to talk about. And it's pretty dense anyway. So let's talk about the data. The authors used
data from a survey of vowel inventories of 223 languages and these 223 languages, there were 53
total IPA symbols. So our total vowel possible set that we're going to sample a subset from has 53
vowels in it. And each language has some subset of this. It turns out the large majority of
languages had between 5 and 7 vowels actually tested I think English has 9. Then some, there was one
that had two, but very few that had fewer than 5 and some had upwards of 20, I think the highest,
may even have been in the forties. So a wide range of possible vowels. But the vast majority five to
seven.

</turn>


<turn speaker="Matt Gardner" timestamp="15:27">

And this is also a good place to bring up the comment that you made earlier about actually this is a
continuous space. There are some nice footnotes in the paper that talk about how actually this is a
complicated thing because the way that you pronounce the phoneme in the vowel, in what is different
from how I pronounced the vowel in what, but if you're writing down the phonemes in a language, you
probably want to write them down the same. So there's speaker variation, there's accent differences
there are regional dialects. There are it turns out the consonants on either side of the vowel
affect how the vowel is produced. We have things like diphthongs, like why actually changes the
vowel in the process. The vowel changes as you're saying it. And that's also dialect dependent.

</turn>


<turn speaker="Matt Gardner" timestamp="16:18">

So in the South you say it's not as much a diphthong, it's more like why I said that wrong. I'm not
a southerner, but anyways, there's a whole lot of variation and so it's really hard to make this
discrete and what they ended up doing which is not ideal, but it worked is to well, let me back up
just a minute. The data that they used had a transcription of formants. Oh, I need to backup even
further. Okay. Sorry. so how do we characterize a vowel? That's a, that's another interesting
question. So there's this quality called timbre in music and in phonetics speech that we hear is an
acoustic signal, a frequency wave, a sound wave with varying frequencies in it that has a base
pitch. And if I change my base pitch, it changes the way it sounds like I can say the vowel a, a, a,
a and it's a different pitch, but it still sounds like an a, but if I, and I can also use the same
pitch and change the vowel, so I get a o, u, e and same pitch, different vowel sound what makes that
actually different? The thing that makes that different is the timbre, which we can write down with
medically as the other sets of frequencies relative to the base pitch that are in the acoustic
signal. So if you're familiar with harmonics or musical instruments, like if you if you vibrate a
string like on a violin it'll vibrate at its fundamental frequency and then at various overtones, so
at twice it's fundamental frequency at three times its fundamental frequency, there will be all of
these different vibrations that together make up the timbre of the sound that you actually hear. And
so it's this combination of overtones of harmonics that distinguished between the A and the E and
the I and O even if they're all the same pitch. Hopefully this makes sense.

</turn>


<turn speaker="Matt Gardner" timestamp="18:33">

Okay. So this is what's different, linguists have come up with this thing called formants, which are
like the set of formants are the set of harmonics or overtones that you get for each distinct vowel.
So you might say that like the second overtone that's double the frequency has the highest relative
amplitude in the signal that you get. And then maybe the next highest one is the fourth, the
harmonic, whatever. So the frequencies at which you get the strongest harmonics essentially are
formants. I'm probably not, again, I'm not a phonetician this is probably a little bit off, but
that's the basic idea. And so the way they encoded these vowels now we finally get back to the
actual data. The way they encoded these vowels is as the first two formants associated with each
vowel.

</turn>


<turn speaker="Matt Gardner" timestamp="19:35">

So for the vowel, a, you write down in the language what frequencies the harmonics were that made up
these formants. Okay. Now as you, as you said, as we've talked about these frequencies vary across
person, across a variety across dialect across region. And so even recording them in the first place
is hard and was done by different people in this vowel inventory. And so it's hard to be consistent
there. And that's even before they got the data. But they got the data. What they did was they
averaged the values of these formants across all of the languages. So that each distinct IPA symbol,
it's feature vector was the two formants averaged across all of the, the formants as recorded in the
data for the 223 languages. Okay. Oh,

</turn>


<turn speaker="Waleed Ammar" timestamp="20:36">

That's a very interesting discussion. Did the actually collect the the data themselves or did they
use an existing resource?

</turn>


<turn speaker="Matt Gardner" timestamp="20:44">

They used an existing resource.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:46">

And is it the case that every vowel among the 53 unique IP symbols for vowels have a different tier
of formants of top formants?

</turn>


<turn speaker="Matt Gardner" timestamp="20:59">

Yes, There's a figure in the paper. They only show one, two, three. They show like 12, 11 different
phonemes different IP symbols in figure one on the first page of their paper. And they're all in
different spots. So the graph plots them on formants base where you have the first two formants in
just a grid and they're all in different places. Some are close, some are closer than others as you
can imagine. But yeah, they're all different.

</turn>


<turn speaker="Matt Gardner" timestamp="21:34">

Okay. So this is the data that we have and remember, the model that we're doing is, is density
estimation. We're building a generative model of some data that we saw. This is very similar to
language modeling where given some set of words, I'm trying to predict the word that comes next. And
the typical way to evaluate language modeling is on perplexity. How surprised. And so I trained my
model on a bunch of data. I hold out some other data and then I see how, what probability does my
model assign to this new data? How surprised is it by the data? And if it is very surprised at data
that was drawn from the same distribution that it was trying to model, then probably it didn't do a
very good job modeling the data. It should be able to so, there's a decent argument that if it can
assign high probability to held out data, it's a better model that better captures the underlying
distribution.

</turn>


<turn speaker="Matt Gardner" timestamp="22:32">

And so the way that this paper evaluates their models on these vowel inventories is they take the
223 languages, they split it into train and test, train dev and test. And they do this with cross
validation, details are in the paper. But you train the model on some data and then you evaluate the
probability that the model assigns to held out data. How likely are the vowels that are actually
tested in these held out languages, According to my model? One issue with this evaluation is it's
really hard to think like how well am I doing? Did I do a good job? I guess with language modeling
we can actually measure perplexity in humans. And so we can have a decent measure of, is my model at
least coming close to the perplexity that a human would assign to some new texts. It's hard to think
of an analogy here, linguists could assign surpriseness scores, perplexity scores to vowel type
vowel sets in new languages that seems implausible.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:40">

I think the number of people can do this is very small in the work.

</turn>


<turn speaker="Matt Gardner" timestamp="23:43">

Yeah. So, perplexity while it is like the right way in some sense to evaluate these kinds of models,
it's also in some sense unsatisfying because it's really hard to know what this even means. And so
they also present another evaluation which is given a subset of the vowels in a particular language,
predict the ones that are missing. So they have three different settings here. One is I'm given all
of the vowels in the language except for one, I know there's exactly one missing. I have to predict
it.

</turn>


<turn speaker="Matt Gardner" timestamp="24:18">

And then they also say I'm given either one or zero of the vowels could be removed. I have to
predict if there's one removed and if so, which one? And then also up to two removed. So these
different, you can call them cloze style evaluations where you hold one out, you try to predict it.

</turn>


<turn speaker="Matt Gardner" timestamp="24:37">

Okay. So that's, that's the experimental setup. How well did they do? So the best model that they
did got, I'm not going to tell you perplexity numbers cause they don't mean anything to me and they
want to either, I don't think but the best model that that they had when you're holding out exactly
one vowel and trying to predict it, the best model got the right vowel 73% of the time.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:05">

That's higher than I would have thought.

</turn>


<turn speaker="Matt Gardner" timestamp="25:07">

It's pretty high, but I guess still looking at this, you have the question, how good is that? To me
it's kind of hard to say you need upper and lower bounds to even be able to evaluate how good this
is. Like we tend to like having reasonable baselines like majority baseline or other kinds of things
when we present models on some new tasks so that we know how good something is. And we like having
some upper bound human performance, for instance, on question answering tasks or other, other kinds
of upper bounds. And neither one of those was given here in this paper.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:41">

So I guess one obvious thing would be to like pick the most likely vowel that's not in the set.

</turn>


<turn speaker="Matt Gardner" timestamp="25:49">

Yeah, to some extent the Bernoulli point process does this. It's a model that only really captures
how common different vowels are. And so you could think of that as something like a most frequent
baseline. But it's parameterized so it's not exactly that and it would be really simple I think to
just compute like have a list of all of the vowels by frequency in the 223 languages and just pick
the top one that doesn't show up and they don't report this.

</turn>


<turn speaker="Matt Gardner" timestamp="26:24">

But the Bernoulli point process is only about three, three and a half points worse. It gets it right
about 70% of the time. So maybe like that to me says maybe actually this pick the best is going to
do pretty well, or sorry, pick the most frequent is going to do pretty well, but maybe I'm wrong and
the Bernoulli point process is actually doing something fancier but seems like it's not that big of
a gain, but it is a gain. They also don't have any kind of upper bound. You might think of like how,
like what would a good upper bound to look like here? One possibility that I thought of was say
there are two languages in my held out set that are overlapping and all of their vowels except for
one. If that's the case, my model has nothing that will let it pick between the two vowels. Right?
You have to know which language it is in order to get the vowel right, but you don't know which
language it is. And in that case, the model can't get it right. The best it can do is random
guessing cause it doesn't have the information it needs to decide which vowel was held out. And so
you could use something like this to measure, to get some kind of upper bound for how well you could
possibly do on this kind of task.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:47">

I would expect this to be very high. Expect this upward bound according to your suggestion to be an
extremely high number, like close to 1.

</turn>


<turn speaker="Matt Gardner" timestamp="27:55">

Yeah. Like, I haven't looked at this data. I don't know how much this kind of overlap actually
happens. And so maybe it's not a reasonable thing to compute because you actually don't get this
set. But anyway just the point here is that it would have been nice to have some more context on
what these numbers actually mean because it's kind of hard just looking at this table to know how
well am I actually capturing phonetic typology. I don't feel like I know that well enough.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:20">

And how about for perplexity you can always like say we're going to pick that like the next, vowel
at random like we're going to think of all the different combinations that you can make from the
from the set of 53 vowels and assign them like uniform distribution.

</turn>


<turn speaker="Matt Gardner" timestamp="28:41">

Yeah, you could have, yeah, there is some issues there because this is a subset. So you're talking
about a uniform distribution over the power set 53, which is kind of ugly, two to the 53 things, but
it's uniform. So it's just one over two to the 53 for each one. But, yeah, anyway, there's some
footnotes that in the paper, some interesting discussion about actually you need, you need to be
careful in how you evaluate or how you assign probabilities to models because there actually is a
distribution you can capture over the number of vowels that are tested. Some models that they talk
about in prior work will always assign higher probability to smaller vowel inventories. And that's
just, that can't capture the distribution of languages that we see because the mode is at five to
seven and not at two. There was only one that had two. And so if your model will only grow in
probability as the subset size decreases, there's a problem. And some naive baselines that you might
think of might also have this problem.

</turn>


<turn speaker="Matt Gardner" timestamp="30:01">

There are a ton of other interesting details in the paper that we're not going to talk about. This
episode has already gone on very long. It was an interesting paper. A lot to talk about I guess,
especially because it's out of the main focus area for a lot of people. And so there was a lot of
background in linguistics and phonetics that we had to talk about to actually understand what's
going on here. But I will highlight there are some nice visualizations some of the transformations
that, that the models learn from input formants base, these two frequencies to a perceptual space,
how the model interprets closeness between these vowels, which is different from the original
distance metric. They I totally glossed over this because it's complicated, but they, they learned a
nice interpretable mapping from this input space to to this perceptual space that you can read about
in the paper. It's pretty interesting and I think that's it.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:59">

Thank you, Matt for presenting this paper. In the next episode we're going to talk about a paper
titled: Tying Word Vectors and Word Classifiers: A Loss Framework for Language Modeling.

</turn>
