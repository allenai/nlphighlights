---
title: "Alignment of Multilingual Contextual Representations, with Steven Cao"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Steven Cao"]
number: "112"
tags: []
description: "We invited Steven Cao to talk about his paper on multilingual alignment of contextual word embeddings. We started by discussing how multilingual transformers work in general, and then focus on Steven’s work on aligning word representations. The core idea is to start from a list of words automatically aligned from parallel corpora and to ensure the representations of the aligned words are similar to each other while not moving too far away from their original representations. We discussed the experiments on the XNLI dataset in the paper, analysis, and the decision to do the alignment at word level and compare it to other possibilities such as aligning word pieces or higher level encoded representations in transformers. Paper: https://openreview.net/forum?id=r1xCMyBtPS Steven Cao’s webpage: https://stevenxcao.github.io/"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner Waleed Ammar and Pradeep Dasigi.

</turn>


<turn speaker="Matt Gardner" timestamp="00:09">

Okay. Today our guest is Steven Cao, who is an undergraduate at the University of California at
Berkeley, doing undergraduate research with Dan Klein and with PhD student, Nikita Kitaev, who is
also at Berkeley. Steven, welcome to the program.

</turn>


<turn speaker="Steven Cao" timestamp="00:23">

Thank you. Thank you for having me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:25">

I've been thinking a lot about multi-lingual stuff, especially with transformers, like how do
multilingual representations work inside of a transformer? And Steven and collaborators had a nice
paper at ICLR 2020 that deals with this in a pretty nice way. The paper's titled Multilingual
Alignment of Contextual Word Representations. So I thought Steven, to get us started, can you give
us just an overview of what a multilingual transformer is?

</turn>


<turn speaker="Steven Cao" timestamp="00:52">

Yeah, so basically I like to explain it with multilingual BERT, but with regular BERT, you train on
just English, Wikipedia and you do mask language modeling, which means you mask a word, and then you
tell the model to predict that word. So in multilingual BERT, what you do is you do that same
objective, but you first concatenate all of the Wikipedias for like 100 languages and you
concatenate them together and then now you shuffle it and now your batch contains multiple languages
and somehow this has the effect of having a transformer where the representations are shared across
languages in the sense that if you train on English data, you'll achieve reasonable accuracy on
other languages without any data from those languages.

</turn>


<turn speaker="Matt Gardner" timestamp="01:41">

How do you actually, so the only thing that seems like it's multilingual in there is that I have
some shared vocabulary and I'm training that my representation of that shared vocabulary to work on
multiple languages. Is that correct?

</turn>


<turn speaker="Steven Cao" timestamp="01:54">

Yeah, that's why it was surprising to me at first because you're just concatenating the Wikipedias,
and you're computing your word peace vocabulary on that. But there are some like hypotheses from
previous papers that go into more detail on how that might be occurring.

</turn>


<turn speaker="Matt Gardner" timestamp="02:09">

Do you have any summary of what those are?

</turn>


<turn speaker="Steven Cao" timestamp="02:11">

Yeah, so if you recall the unsupervised alignment work in the non contextual case, there's one paper
by Mikel Artetxe where he did. So in the unsupervised case you have a dictionary of word pairs, but
you start with just numbers and then given a dictionary you can learn a mapping between word vectors
of two languages that tries to minimize the distance between word pairs in that dictionary. So what
he did is he alternated between inducing the dictionary using nearest neighbors with your aligned
embeddings and then also using the bigger dictionary to now realign your embeddings.

</turn>


<turn speaker="Steven Cao" timestamp="02:53">

And then once you have better alignments, you then add more words to your dictionary and then you
repeat. So the theory by Telmo Pires in his ACL paper titled: How Multilingual was BERT, he had a
similar idea where you first start with shared sub words like URLs and numbers, and since they're
the same sub word, they must have the same embedding. So their representations are automatically
shared by the virtue of having a shared vocabulary. And then anything that co-occurs with these sub
words should then also have similar representations because that's how the embeddings are
calculated. So there's kind of like a ripple effect where you start with shared numbers and URLs and
then you get to align things that are co-occurring with those and then co-occurring with the things
that co-occur with them. And so, and then you get like a pretty good alignment afterward. So I
really liked this theory and I think it makes a lot of sense.

</turn>


<turn speaker="Matt Gardner" timestamp="03:47">

And so this is in some sense assuming that when people use numbers in texts in different languages,
the way they use those numbers is going to be similar across the languages.

</turn>


<turn speaker="Steven Cao" timestamp="03:58">

Yeah. And I guess URLs as well or like names like Barack Obama or stuff like that.

</turn>


<turn speaker="Matt Gardner" timestamp="04:05">

Yeah, yeah, yeah, definitely names also. And even like, let's say we assume a handwritten small,
many to many alignment dictionary like apple and monzana for Spanish or something. I give a few word
pairs that I know align at least in some of their senses. And just to give listeners a little bit
more intuition, like you can do the same thing, but it again relies on this assumption that if I use
the word apple in some context in English, the words that I see around it are similar to the same
words that I see around manzana in Spanish. And if I, I guess it's like maybe language is a
reflection of the human experience and so that's why this works because people talk about similar
things across different cultures and languages and whatever. I feel like that has to be what like
the assumption behind what's making this work.

</turn>


<turn speaker="Steven Cao" timestamp="04:53">

Yeah, definitely makes sense. Like I guess if you had a completely different culture then it might
not work as well because they'd talk about things totally differently.

</turn>


<turn speaker="Matt Gardner" timestamp="05:02">

So I guess then there's this question. So like languages have, even if like word co-occurrences are
similar across different languages. The way that languages put these things together is going to be
very different. And so even if you can say, maybe I can align things at like layer zero of a
transformer, just the base word piece embeddings you have some function that combines meaning across
the different word pieces. This is the self-attention, the stacked self-attention stuff inside a
transformer. That function is going to have to behave in some similar way across languages in order
to get like span representations that are similar across languages. Right? Or the big juicy red
apple. And if I get a translation of that in Spanish, I want the embedding of the entire phrase in
English to be similar to the embedding of the entire phrase in Spanish. But this relies on more than
just my word pieces having the same embedding, it relies on the functions working in similar ways
across both of these languages even though the word order and the composition might be radically
different between these languages. So again, I guess the question is, how does this actually work?
Does it work? How does it work?

</turn>


<turn speaker="Steven Cao" timestamp="06:16">

Yeah, that's a good point. And I guess I don't really have a good answer to like how that actually
works, but my intuition on it is just going back to the masked language modeling objective. And
trying to look at words around a word but masking the word itself and trying to predict it. I think
that if you have a multilingual transformer and you give it a bunch of sentences with varying
languages but you don't tell it which sentence is from which language, it'll probably learn to
ignore word order and just look at correlations. Like if you have juicy and red then apple's
probably nearby. But that doesn't mean it has to come directly after or directly before. Especially
because like the languages you're getting in, you don't know which language you get based on like a
special token or anything. So that would be my hypothesis. Just that like in this objective you
learn to get correlations with like distance rather than like absolute position.

</turn>


<turn speaker="Matt Gardner" timestamp="07:18">

Interesting to think about this. Yeah because one way to test that hypothesis is to look at the
informativeness of the positional encodings or something across different languages or across a
monolingual versus multilingual BERT or something like that. I know people have done studies where
they look at particular attention heads and see how much they correspond to like finding syntax, but
maybe you just have, you make use of more of the heads. I know, I know a lot of these works, like we
had an episode with Elena Voita and others have studied this too, like where you can prune out most
of the heads and still get similar function. Maybe a multilingual model is using more of the heads
and just has more functions that are language specific. I am skeptical that like it doesn't know
anything about the syntactic relationship across the different languages and so it's got to do
something but maybe it's using its previously unused capacity like I don't know, there's just lots
of interesting questions here.

</turn>


<turn speaker="Steven Cao" timestamp="08:15">

Yeah, that's very interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="08:16">

And I guess your paper tries to get at least one small piece of answering this puzzle and so we
should probably move now to talking about your work and so you tried to take the contextual
representations and the multilingual model, multilingual transformer and aligned them. Do you want
to give us an outline of what, what's going on in this paper?

</turn>


<turn speaker="Steven Cao" timestamp="08:36">

Yeah. So, we looked at multi-lingual BERT and we saw that it had some zero-shot performance. And
intuitively you would expect that the only way you can achieve zero-shot performance is if the
embeddings are aligned as in like for the example of XNLI which is cross lingual natural language
inference. You take in two sentences and you predict whether they're contradictory, implying each
other or neither and you take in their sentence embeddings and you spit out a classification. So if
you're achieving zero-shot then you have to have similar embeddings for the same sentence in two
languages. Otherwise the classifier will just not do the right thing. So given this intuition, we
wanted to kind of formalize it and test it and see if we can push it further. So we looked at past
work on non-contextual alignment and we came up with simple extensions to the contextual case. So we
instead of like bilingual dictionary induction, we have contextual word retrieval and instead of
regular alignment we have contextual alignment. And then we looked at whether alignment, predict
zero-shot performance, whether you can improve zero-shot performance with alignment and these sorts
of things.

</turn>


<turn speaker="Matt Gardner" timestamp="09:55">

Okay, so you enforced this alignment between the languages using, or you encoded it into a loss
function that you could directly optimize. Do you want to tell us about how you did that?

</turn>


<turn speaker="Steven Cao" timestamp="10:03">

Yeah, so intuitively if you have a parallel corpus with word pairs, then if you want the embeddings
to be aligned then you'll want the embeddings for two word pairs to be similar. So like cat in one
language and cat in the other language. So you can put this in a loss function by just summing over
all of the word pairs in your corpus and looking at the distance between the embedding for one of
the words and the other word and we used squared L2 distance. And another term you have to add is if
you just have this loss function where you look at this distance between word pairs. The problem is
that there are a lot of degenerate solutions like the model can just output zero for everything and
then it gets perfect alignment. So you want to also preserve the structure of the embedding space or
like what about the embedding space that makes it useful?

</turn>


<turn speaker="Steven Cao" timestamp="10:57">

So we did this by fixing the embeddings for one of the languages and letting the embeddings for the
other language move toward that. So you add an extra term where you take, you freeze the initial
BERT model and you look at your BERT model on like your current iteration and then you take every
word in your English corpus and you compare, you look at the distance between your current model and
the initial model and then you penalize that distance. So you have two terms, the English fixing
distance and then the distance between English and your previous language or your foreign language.
And then you try to minimize both of those.

</turn>


<turn speaker="Matt Gardner" timestamp="11:35">

So just to paraphrase back to be sure I understood, you're taking all of the confidant alignments
that you have in a parallel corpus. And you're saying my representation of these parallel words
should be the same?

</turn>


<turn speaker="Steven Cao" timestamp="11:46">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="11:47">

And I should change my representation of these words such that they're the same but not too
different from my original encoding.

</turn>


<turn speaker="Steven Cao" timestamp="11:53">

Yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="11:55">

So this sounds like basically identical to what you would do in the non contextual case other than
you have a function on top of, you don't just take a base word embedding. You have a
contextualization function on top of that.

</turn>


<turn speaker="Steven Cao" timestamp="12:07">

Yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="12:08">

Is that fair?

</turn>


<turn speaker="Steven Cao" timestamp="12:10">

That's part of it. But at the same time, in the non-contextual case, people use matrices, so they
would apply a matrix to one of the embedding spaces and the matrix was constrained to be orthogonal,
which means it's a rotation. So you can think of as rotating one embedding space into the other. So
what we're doing is we have a contextualization function on top of the embeddings as BERT does, but
we're changing the weights of both the embedding matrix and the contextualization function. So we're
just changing all the weights and we're not using any matrices at all.

</turn>


<turn speaker="Matt Gardner" timestamp="12:44">

Because the contextualization function is already sufficiently parameterized to do whatever you
want.

</turn>


<turn speaker="Steven Cao" timestamp="12:49">

Yea, basically.

</turn>


<turn speaker="Matt Gardner" timestamp="12:51">

I guess this sounds, when you say it like that, it seems like a pretty simple idea, but it also
seems like it should work pretty well.

</turn>


<turn speaker="Steven Cao" timestamp="12:58">

Yes. So it does work pretty well.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="13:00">

Yeah. Just to be clear, you keep saying word pair, so the assumption here is that we arewith one-to-
one alignment, correct?

</turn>


<turn speaker="Steven Cao" timestamp="13:09">

Yeah. So we'll start with a parallel corpus. We'll run an IBM model in both directions to get word
alignments. We'll keep the intersection and then we'll keep the one-to-one alignments from the
intersection.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="13:22">

Okay. So I guess we'll talk about the specific details of the corpus and have you, I mean, what do
you do with these alignments and maybe the limitations and all of that later, but I just wanted to
make a quick point that when you're relying on one-to-one, alignments would probably miss out on
possible one-to-many alignments and many-to-one alignments, which could also be a lot more
informative, correct?

</turn>


<turn speaker="Steven Cao" timestamp="13:45">

Not quite, because we're taking the intersection first and then we're taking the one-to-one
alignments. So if you have a one-to-many alignment in one of the IBM model directions, it'll be one-
to-many. But in the other IBM model direction, it'll be one-to-one because the word that gets many
alignments can only pick one alignment. So when you take the intersection, a word that has multiple
words aligned to it in the other language will have to pick one of them and then that'll already be
one-to-one. And then we just keep that.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="14:14">

Okay. Okay. Yeah. All right that makes sense.

</turn>


<turn speaker="Matt Gardner" timestamp="14:17">

But I guess this still has an issue where if I have two words, say like pick up, I picked something
up and I have a word and a verb and a particle in English, which is always just encoded as a single
verb in some other language because they've grammaticalized, I forget the word like actually merge
the particle with it in English or just had a verb that had the meaning that that English needs a
particle for in the first place. They just had a verb for it. What would happen in that case?

</turn>


<turn speaker="Steven Cao" timestamp="14:51">

What would happen is that the single word in the other language would just get one of the words. So
as an example, if you have would "like to" in English, like I would like to go, there's a single
German word, I'll probably not pronounce this correctly, but is "möchte" which means would like to,
and it gets aligned to like and the "would" and the "to" are just like thrown out. But that's okay
cause we have contextual embeddings so the "like" is actually "would like to," if that makes sense.

</turn>


<turn speaker="Matt Gardner" timestamp="15:19">

Interesting. Yeah. This makes me think of like whether word alignments here is actually the right
place to do this alignment. Even the token level contextual embedding if this is the right place to
do an alignment.

</turn>


<turn speaker="Steven Cao" timestamp="15:33">

Yeah. I've thought about doing sub-word alignment, like first run the corpus through BERT's, sub-
word vocabulary and then do like fastAlign on top of that instead of just the like the words as
their units. I think it would also work, maybe work better, but I haven't tried it.

</turn>


<turn speaker="Matt Gardner" timestamp="15:52">

But I guess assume that German word got just a single word piece. You still have the same problem,
right?

</turn>


<turn speaker="Steven Cao" timestamp="15:58">

Yeah. I guess the sub-word thing would take care of instruction or morphology where you have like ed
like played is maybe it's the into "play" and "ed" and then you'd align "play" and "ed" separately.
But you're right in that like single word units that are really common would not be broken up.

</turn>


<turn speaker="Matt Gardner" timestamp="16:17">

Yeah. That's being perhaps a bit optimistic about the morphology that you can recover from a word
piece alignment or a word piece segmentation. But point taken still though, I wonder, we could take
a step back and think about, I remember the, what is it, Voronoi? [editor: it's Vauquois]? the
triangle that back in the days of statistical machine translation, everyone always talked about
where like you can do translation at the word level or at the phrase level or using the syntax or go
all the way up the triangle to this magical intralingual in some sense that is exactly what these
multilingual transformer models are doing. Like they're encoding text in some language into
something that's like an intralingual how well it actually works is a different question but that's
like the modeling assumption that's going on here. You're getting to a single shared representation
space, but why should that representation space be aligned at this segment level instead of just
like if I could get a single vector en coding everything like these, word alignments make this a
little bit tricky. Like there are some languages that will smash everything together into a single
token and it's not at all, it seems unlikely to get like a shared representation between them. But
if I could have like some, again magical single vector representation for the content of a sentence,
then perhaps I could enforce alignment better there. Is this making any sense at all?

</turn>


<turn speaker="Steven Cao" timestamp="17:41">

Yeah, that makes sense. Like I guess you could think of the BERT CLS token as being the sentence
encoding and then you could try aligning the CLS tokens. So we did try this where you take the
parallel corpus and you don't even compute word alignments and you just align the sentence vectors
and it does work but it doesn't work as well. And what I think is that you just get more supervision
if you also align the words cause you have a sentence and it has like 30 words and you have to do
all this computation to get all of the embeddings and you throw all of them away and just align the
CLS embeddings when you could have just aligned like 70% of the words or however many had
alignments.

</turn>


<turn speaker="Matt Gardner" timestamp="18:22">

That's really interesting.

</turn>


<turn speaker="Steven Cao" timestamp="18:24">

I think that the vectors are contextual kind of alleviates some of the issue where you have like a
huge word in Hungarian that means that has like a bunch of infection and then you have like multi
words in English. The fact that it's contextual, means that you would hope that like one of the
words in English would have enough information to encapsulate the meaning of the whole phrase and
then if you align that to the huge word in Hungarian, then it should just work.

</turn>


<turn speaker="Matt Gardner" timestamp="18:53">

Okay. Yeah, that's a good point to use some slightly different terminology that makes more sense to
me. Each phrase has a head and you could imagine that you get some head alignment between the
languages and so the vector for the head encodes, all of its arguments ore the whole phrase and then
just aligning the head might be sufficient in your loss function to get useful similarity. That's a
really good point.

</turn>


<turn speaker="Steven Cao" timestamp="19:15">

That would be the hope at least.

</turn>


<turn speaker="Matt Gardner" timestamp="19:17">

Yes. Yes. You said that it, that the CLS embedding doesn't work as well as the token level
alignment. I still wonder about that conclusion based on the datasets that you used, but we should
probably talk about the experiments that you ran before we get back to that question. So do you want
to tell us about what exactly you ran and what the outcome was?

</turn>


<turn speaker="Steven Cao" timestamp="19:33">

Yeah, so first we looked at alignment. So for alignment we have Europarl as our dataset and we had
five languages each paired with English. We had Bulgarian, German, Greek, Spanish and French. And we
just chose these five cause it's the intersection between Europarl and the XNLI dataset. So what we
did is we used this data, we ran fastAlign in both directions and got the intersection and the one-
to-one alignments and using these alignments we ran the alignment procedure where we minimize the
distance between word pairs and then the first experiment we ran was contextual word retrieval where
for each word in the English Europarl, you look at French Europarl and you look at its nearest
neighbor and then you check whether the nearest neighbor matches the ground-truth word pair computed
by fastAlign. In that experiment we saw that if you run alignment, it makes the accuracies go up by
a lot, which is probably not that surprising given that you're basically optimizing the objective.

</turn>


<turn speaker="Steven Cao" timestamp="20:35">

And one nice thing is that base BERT is like kind of bad for aligning Bulgarian and Greek with
English, but it's better for Spanish and French probably cause they're more similar with English.
But after you run explicit alignment, you get roughly 50% accuracy across the board. So that points
to maybe how explicit alignment can overcome some of the shortcomings of just the joint multilingual
pre-training procedure. And then the experiment we ran after this is testing on XNLI zero-shot,
which means we now take this aligned BERT and we plug it in instead of base BERT, and then we do the
regular fine tuning procedure on English data and then we test on other languages. And what we found
there is that the zero-shot performance goes up by quite a bit. For the languages that were already
good, like Spanish and French. It goes up by 1%. And then for the languages that were kind of bad,
like Bulgarian and Greek, it goes up by like 5% so that kind of matches our intuition, that better
alignment leads to better zero-shot. And then we also had some analysis after that.

</turn>


<turn speaker="Matt Gardner" timestamp="21:42">

Yeah, very nice. One thing I'll point out, going back to my earlier question is that all of these
languages that you used are Indo-European. They share a common ancestor and so you might think that
you will get better than average token alignments in this setting. And so given that there is
probably at least a somewhat reasonable token alignment using the token alignment instead of the CLS
embedding could be expected to help. And I wonder if your experiment would give you the same result
if you used some very different languages from entirely separate language families.

</turn>


<turn speaker="Steven Cao" timestamp="22:14">

Yeah, that's a good point. We did do some experiments with Hungarian, Polish and Swedish and it
works roughly the same for those. And then we tried Chinese, Arabic and Urdu and those experiments
were like briefer. So it's harder to say more from them, but it seems to help as much. Like for the
original experiments, we use 200,000 sentences per word pair and for this later experiment we use
10,000 per word pair, but we saw that the zero-shot for these three languages, Chinese, Urdu and
Arabic still went up by like roughly 1% but we haven't tried it on 200,000.

</turn>


<turn speaker="Matt Gardner" timestamp="22:52">

One other things I've been thinking about is that you haven't heard of this episode yet, but in our
last episode we talked to John Clark about TyDi QA, which is a multilingual question answering
dataset that was intentionally collected with, from scratch in each of the different datasets
instead of involving a translator. And one point that John brought up in that episode was that when
you're dealing with modeling translationese, you can get some interesting artifacts and I was
interested to see that all of your experiments with XNLI, this cross lingual natural language
inference dataset, that's all translationese because the data started in English and then it was
translated to these other languages. And then you're using Europarl, which is also translationese to
align these multilingual embeddings and perhaps, perhaps you're just seeing the gains that you're
seeing because your model has picked up on something about translationese. And if you had tested on
something other than translationese, maybe it wouldn't work so well would, what are your thoughts on
this?

</turn>


<turn speaker="Steven Cao" timestamp="23:52">

Yeah, I actually hadn't thought about this before you mentioned it, but it's a very good point
because we're computing token level alignments and the alignments are going to be way better for
translationese because the translator will translate roughly word for word. So that's a very good
point. We did try some experiments that were very brief early on in the project on universal
dependencies, which I don't think is translationese. So they do universal parts of speech in
dependency parsing and we didn't see much gains for that. So it's possible that this is the reason,
but there are lots of other confounds like this is syntax and not XNLI and there's been some past
work on syntax being in the earlier layers of BERT and like Ian Tenney's paper: BERT Rediscovers,
the NLP Pipeline, he saw that syntax is in the earlier layers of BERT. But in Telmo Pires' ACL
paper, he saw that BERT is better aligned in the later layers and it's less aligned in the earlier
layers. So there might be something there and it might be better to align the earlier layers or
something like that. So there are a lot of confounds here but it's definitely a good point. That
translationese, is like a big factor in this.

</turn>


<turn speaker="Matt Gardner" timestamp="25:11">

That's really interesting. So just to be a little bit more clear on your dependency parsing
experiments, you said you didn't see gains from the contextual alignment relative to a like a word
level rotation.

</turn>


<turn speaker="Steven Cao" timestamp="25:24">

Oh no. Like after you run alignment then you compare base BERT and aligned BERT, and aligned BERT
has like worse performance for English, like even though you're.

</turn>


<turn speaker="Matt Gardner" timestamp="25:36">

for English, Okay.

</turn>


<turn speaker="Steven Cao" timestamp="25:37">

So that means that like it's capability to model syntax is going down and like not just the
alignments and like I wasn't sure whether like the gap between English and other languages was
smaller or not or anything like that. But these are like kind of brief experiments. And like part I
wouldn't read too much into it cause there's like a lot more to be done there but it is a negative
result for sure.

</turn>


<turn speaker="Matt Gardner" timestamp="26:02">

Yeah, I hear what you're saying and I think there are so many open questions here. It's really
interesting. So much to understand about what's going on in this multilingual stuff. I think I had
one more small question. I assume on the, so you tested on six languages with XNLI, so there was
English, Bulgarian, German, Greek, Spanish and French. I assume that for some of these languages you
had more frequent, the percentage of the overall tokens that were in a one-to-one alignment was
higher. I would assume that Spanish and French for instance, maybe German anyway, I would assume
that for some of these languages the unsupervised alignment has an easier time finding
correspondences. And so then in a sense you have more training data even for the same number of
overall tokens in your alignment loss function. So I wonder if there's any kind of correlation that
you saw between performance or accuracy or utility of this cross lingual alignment. Based on how
much of the data actually was aligned.

</turn>


<turn speaker="Steven Cao" timestamp="27:03">

Yeah. Actually across all the languages, the alignment percentage was roughly similar. So for French
it's like 0.65 or 0.66, 0.67. And then for Bulgarian it's like 0.72 and everything's between that.
So like ranging from between 0.65 or so and 0.72 or so.

</turn>


<turn speaker="Matt Gardner" timestamp="27:25">

And so that, you mean like 72% of your tokens had a one-to-one alignment? Is that what you mean?

</turn>


<turn speaker="Steven Cao" timestamp="27:29">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="27:29">

That's surprising. That's not what I expected to hear.

</turn>


<turn speaker="Steven Cao" timestamp="27:32">

Yeah. I don't know that much about word alignment as a problem. So yeah. I don't have any insight on
this.

</turn>


<turn speaker="Matt Gardner" timestamp="27:39">

Yeah, me either.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:39">

Yeah, I was just wondering, so your objective, I just had a quick question about your objective and
how it relates to the retrofitting idea that people used to talk about in the pre-contextual
embedding era, I guess. So what they did was essentially take a pre-trained word embeddings and try
to retrofit them to existing knowledge bases and stuff so that they respect the relations that the
knowledge base could do. In a sense what you're doing sounds very similar with conditional
embeddings and trying to align them across languages. Right? I mean, would you agree that's a fair
comparison?

</turn>


<turn speaker="Steven Cao" timestamp="28:16">

Yeah, I think that's similar. I'm not too familiar with the retrofitting work, but it does sound
similar to what we're doing.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="28:23">

Yeah, I think related to that. I was wondering if it would make sense to focus on specific word
classes. Say for example, you want to make sure that maybe you want all the nouns in your data to be
aligned. I mean, would it make sense to like put a greater weight on specific word classes, as
opposed to other word classes? And do you think it's it would make sense to modify that objective
and if you'll get anything based on that.

</turn>


<turn speaker="Steven Cao" timestamp="28:51">

Yeah, I actually thought about this about like, whether you can align, not just meaning, but like
syntax.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="28:57">

Right!

</turn>


<turn speaker="Steven Cao" timestamp="28:59">

So like can you make sure that similar syntactic structures across languages have similar embeddings
and you have syntax embeddings or something like that. And I do think it makes a lot of sense. The
method that I've come up with for that is just to train a parser but share the output head. So this
would work for maybe like universal dependencies where you have the same output structure for all of
the languages, but you would basically feed in sentences from a bunch of languages and then you
would have a single output head that has to predict the dependency relation between different
positions. And since you only have one output head, you're forcing the embeddings to be the same if
you want the same predictions for similar structures. So I think you could think about this sort of
alignment to where you have an objective and you have training data and you don't need parallel data
in this case you just need like data across different languages and you can think about doing
alignment for other things too. I think it's very interesting.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="30:03">

Yeah, that's a good point. That's really a good point. So the fact that you don't need aligned or
parallel sentences for what you just described I think is interesting. You could just take, maybe
even Wikipedia document in many different languages which talk about probably similar things and
which are not necessarily aligned and you could still use them.

</turn>


<turn speaker="Steven Cao" timestamp="30:22">

Yeah, you could use document level parallelism and then like get a document embedding and align the
document embeddings. That's also pretty interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="30:31">

This question reminded me also of some analysis that you did in the paper on how aligned different
word classes were do you want to tell us about that analysis?

</turn>


<turn speaker="Steven Cao" timestamp="30:42">

Yeah, so what we did is we split the test data into different sections. So we had like, we split it
by part of speech and then we looked at open-class, we saw a pattern. So if you look at the accuracy
breakdown by part of speech, you'll see that open-class parts of speech, like noun, verb, adjective
adverb have lower alignments. This is for base BERT not aligned BERT. And then if you look at closed
class categories like conjunction or like stuff like that or like determiner, then you'll have
better alignments. And then if you have lexical overlap like new numerals, then you have the
highest. So the part about lexicali overlapping categories, having high alignment is pretty self
explanatory. But the part about open-class and closed-class, I think the hypothesis that we had kind
of piggybacks off of Telmo Pires hypothesis about like the ripple effect of co-occurring words.

</turn>


<turn speaker="Steven Cao" timestamp="31:37">

So the whole point of the mass language modeling objective is that you capture word co-occurrences.
So if you look at the co-current statistics of like the word apple, you can swap apple for so many
different nouns and the sentence might still make sense or still be pretty common in your corpus
because it's an open-class word. So that suggests that the co-occurrence statistics are like less of
a strong signal for alignment. Because even if apple in English and apple and Spanish have similar
co-occurrence statistics, they'll be similar to so many other nouns that it might not be that useful
as opposed to like determiners or conjunctions or other words that serve syntactic categories or
syntactic functions. You might see that if you have co-occurrences for those, the co-occurrences are
a stronger signal for alignment because you can't swap in one conjunction for another as easily or
you can't swap in one determiner for another as easily. So perhaps that leads to better alignment.
And this obviously depends on like the syntactic relationship between the two languages, but that
was like the conclusion that we were led to.

</turn>


<turn speaker="Matt Gardner" timestamp="32:54">

Interesting. Yeah, it was a nice, nice little piece of analysis. Great. This has been a really
interesting discussion. I think I have asked all of my questions. Was there anything that you wanted
to talk about that we didn't get to or any final thoughts before we conclude?

</turn>


<turn speaker="Steven Cao" timestamp="33:05">

Not really. I had a lot of fun, so thank you for this.

</turn>


<turn speaker="Matt Gardner" timestamp="33:12">

Great. Thanks for coming on.

</turn>


<turn speaker="Steven Cao" timestamp="33:13">

Yeah, thank you for having me.

</turn>
