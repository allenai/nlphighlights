---
title: "Neural Machine Translation via Binary Code Prediction"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Graham Neubig"]
number: 029
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work innd
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at The Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:11">

Today our guest is Graham Neubig, Graham is an assistant professor at Carnegie Mellon University. He
works on various problems in natural language processing. In particular. He's interested in machine
learning approaches that are both linguistically motivated and tailored to applications such as
machine translation and speech recognition. It's a great pleasure having you with us today, Graham.

</Turn>


<Turn speaker="Graham Neubig" timestamp="00:33">

Yeah, nice to be with you.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:35">

So today we would like to pick your mind on some of the recent advances in machine translation,
specifically the main milestones in neural machine translation and also to discuss the paper that
you've recently published at ACL: Neural Machine Translation via Binary Code Prediction. So let's
start with the machine translation discussion and what your views are on on this, like the recent
advances.

</Turn>


<Turn speaker="Graham Neubig" timestamp="01:07">

Okay. so I think basically it's a really exciting time to be in machine translation right now
because incredible progress has been made in the past four years or so. Due to the advent of neural
machine translation. And you can see very real advances where language pairs that were very
difficult to do before, like Japanese English or Chinese English are actually getting to the point
where you can read and understand the text to a point where you can actually get most of the useful
information out of it, which I think is really exciting. Of course there are still lots of problems
left. So recently I tried to cook a Korean dish and I got a bag that had the instructions in Korean
and I tried to run it through Google translate and realize that there's still a lot of work to be
done. But for domains where we have lots of data for example, or language pairs where we have lots
of data, things are really much better than they were a couple of years ago.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:22">

So are you saying that in cases where we don't have a lot of data, you'd still recommend using
phrase base machine translation?

</Turn>


<Turn speaker="Graham Neubig" timestamp="02:30">

I wouldn't go so far as to say that although you could make an argument that that is the case. There
was just a paper that came out by Philipp Koehn, (Rebecca Knowles) called Six Challenges for Neural
Machine Translation, which will be appearing in the workshop on neural machine translation at ACL,
which I'm also co-organizing. But he has a very interesting example of where you train a neural
machine translation on data in a particular domain and then use it to translate data in a different
domain. And you can see the phrase base machine translation system kind of falls apart and you don't
know you can't figure out what it's supposed to be saying. But the neural machine translation system
basically attempts to translate into something that it already knows how to say. So if it's
translating something from the Bible or if it's trained on data from the Bible and it's translating
something from another domain, everything will come out in very biblical [language] and might not
have anything to do with the input. And in a way that's a little bit scary because you know, you
never know what you're gonna get and there are you know, you have trouble having confidence that
what you get is actually what came in on the source side. But overall, I think the average level has
really gone up a lot even in some lower data scenarios.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:59">

So you said earlier that Japanese English and Chinese English now work a whole lot better with
neural machine translation systems then they did previously what is it about these news techniques
that make it work so much better?

</Turn>


<Turn speaker="Graham Neubig" timestamp="04:11">

So I think the biggest thing if you just look at the results, the biggest thing that you'll notice
is that the sentences that come out are actually grammatical and they actually make sense in the
target language. And I think that's partly because you have a really strong language model on the
target side that is based on training on lots and lots of data.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:40">

Didn't we have that previously though? So like with a synchronous context free grammar or whatever,
you have a language model on the target side that you're using as you're decoding. So what, what's
actually different here?

</Turn>


<Turn speaker="Graham Neubig" timestamp="04:52">

There we normally used N-gram language levels, which are just not anywhere near as strong as LSTM
based language models, for example, another thing is that is actually surprise, quite important is
whether you're able to generate things that the language, model likes in the first place. So if you
had a synchronous context free grammar, or phrase based machine translation system it could be that
the good sentences are just not in the search space, not in the space of hypotheses that you're
considering. And in that case, no matter how strong your language model is, you can't recover. On
the other hand that's kind of the core reason why neural machine translation systems tend to produce
things that don't match the source at all. It's because they believe in the language model and go in
and generate `whatever they think sounds natural.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:50">

Makes sense, so what would you say the main milestones were in the last few years in a neural
machine translation? It seems to me that sequence to sequence models and the introduction of the
neural language model and the attention mechanism are three of these milestones and I'm not sure
what other milestones there are.

</Turn>


<Turn speaker="Graham Neubig" timestamp="06:13">

Yeah, the main milestones are basically the encoder/decoder architecture by which actually has been
around for a long time, but it was kind of re-discovered in 2013/2014 by Kalchbrenner and Blunsom,
Sutskever et al. And then attention which came out in 2014/15 by Bahdanau et, al. Are the two
really, really big milestones. Other milestones are the use of sub word units for machine
translation that is either in the form of byte pair encoding by Sennrich et al. And or word piece
models which are used by people in Google often. And basically the idea there is that there's two
problems with using lots of data for or sorry, using large vocabularies in neural machine
translation. And that is 1-that computation becomes too heavy and 2-that you can't generalize to
words, that you've never seen before. And apparently splitting things up into sub words basically is
a really effective way of fixing that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:28">

So this helps with like morphologically rich languages where you need to like make sure the
inflections match between the two languages.

</Turn>


<Turn speaker="Graham Neubig" timestamp="07:36">

It definitely helps. It doesn't solve all the problems there, but you're basically making it
possible for the neural MT system to try to solve those problems where if you just have an unknown
word and you treat it as a special UNK token then you're never going to be able to translate data
properly. So that's a big advance, I guess.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:00">

So what is the main way you do this in the paper that you mentioned.

</Turn>


<Turn speaker="Graham Neubig" timestamp="08:05">

So the two methods there are slightly different, but the idea behind byte pair encoding is basically
first you split everything into characters. Spaces are either treated in a special way or just as an
under bar special under bar character. And then you find the character bi-gram that has the highest
frequency in that corpus. And then you merge that bi-gram together into a single word. And then now
you have a new corpus, you count up the the probability of all bi-grams and you merge them together.
Basically this allows you to find high-frequency chunks of characters that you then treat as the
basic units in your modeling there. The word piece model is a little bit more kind of smart in a
way. It goes through and tries to find a segmentation of the units that work.

</Turn>


<Turn speaker="Graham Neubig" timestamp="09:10">

That give you a high uni-gram probability over the entire corpus. So it's more of a probabilistic
model. There are lots and lots of models for unsupervised word segmentation, but one of the big
things in machine translation is we work with very, very large datasets. So a lot of the previous
unsupervised word segmentation models were great, more accurate than the models we're using now, but
they're super slow. So we can't scale them up to you know, millions of sentences, which is why I
think the BPE and and word piece models took off.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:46">

Cool. And in terms of the how people do attention. So I'm not quite sure about the latest
developments in machine translation and what's the state-of-the-art and how to do the attention. Do
we need structured attention? Do we need to have to actually make any dependencies when we're doing
we're computing the attention properties for different words in the target sentence?

</Turn>


<Turn speaker="Graham Neubig" timestamp="10:13">

So I think that's a very interesting problem and there isn't any research that gives a really
conclusive solution to that. But one thing that I think definitely needs to be considered to some
extent is the idea of whether you've already translated a word or not. And that is used either
during training or during decoding, some concept of word coverage in the source sentence. And the
reason why this is important is because when neural MT systems work well, they perfectly translate
the whole sentence to get all the content right. But again, when they get something that they're not
very confident about, they'll either repeat the same word over and over and over again or they'll
drop words that exist in the source, but they just decide not to translate in the target. And even
with models trained on large amounts of data, even with models you know, if you just use the vanilla
model, you end up having those problems. Anytime you kind of get out of your comfort zone when
you're trying to translate things.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:28">

So we recently read Chris Manning's paper on, I think it was summarization.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:37">

Yeah, Abigail See and Chris Manning.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:39">

And he had a cool method for, for doing this. I think they accumulate probabilities that they
attribute to each of the words in the source document. And the more attention you give to these
words, the less likely it will be that you're reusing them in the future. So I wonder if that's a,
there's a similar thing in machine translation that people use.

</Turn>


<Turn speaker="Graham Neubig" timestamp="12:07">

Yeah, I think that idea kind of originated in machine translation or maybe even before that
originated in image captioning. But the, there's a good paper by a Trevor Cohn, which was actually
quite awhile ago now, two years ago, on structured alignment biases for neural machine translation.
Which I really, one of the reasons why I really like this paper is because it still remembered what
we did in the statistical machine translation paradigm. And it knew we needed coverage and knew we
needed an idea of how many words a particular word will translate into it's called fertility. And
then other things like bi-directional training and all of these were things that had been examined
before neural machine translation came out and it went in and showed which ones were useful and
which ones were less useful. Interestingly in that paper the conclusion was a lot of these are not
very useful, but this particular one the bi-directional training one, did end up being very useful.
So, you know, I think those papers are very interesting. You know, you try a bunch of things and
then report all of them regardless of whether they work or not.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:24">

So do you follow language log?

</Turn>


<Turn speaker="Graham Neubig" timestamp="13:27">

Idly? Yes.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:30">

Mark Lieberman, who I guess is in Pittsburgh right now has had a series of posts on seeing how
Google machine translation goes wrong when you give it for example identical strings, varying
lengths, strings of the same Japanese character. Have you, have you seen these posts?

</Turn>


<Turn speaker="Graham Neubig" timestamp="13:46">

I have and that's pretty funny

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:49">

Any idea of what's going on with this.

</Turn>


<Turn speaker="Graham Neubig" timestamp="13:51">

So I guess that kind of goes entirely back to what I mentioned before, which is neural machine
translation breaks when it gets out of its comfort zone. And of course it's never, in its training
data. It's never seen the same Japanese character over and over and over again, because you know,
who would translate that? So because of that, you know, free space translation, what it would do
there is say, okay, I've seen this once in my training data as a single character or as two
characters. And then I'll do that over and over and over again. But neural MT You know, it's
calculating things as a vector of continuous numbers and it doesn't have anywhere near the
constraints. So it just tries to try to generate something that it thinks is plausible,

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:44">

I guess for the listeners who aren't familiar with this, I should have said that you, it turns out
if you could varying length strings of the same character in a variety of languages you can get
interesting. Something that some people have said is like poetry out. Like you, you get different
short words and you add one more character and the output just changes in really unpredictable ways.
It's just kind of funny to look at.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:09">

So I I'm wondering if the machine translation state-of-the-art results in a neural machine
translation copy the words, like use any kind of copy operations which like you can use a machine
translation of what you can use in combination with a translation table. Potentially I'm wondering
if this is something that people have tried.

</Turn>


<Turn speaker="Graham Neubig" timestamp="15:34">

So we had a paper, EMNLP 2016 on incorporating lexicons into neural machine translation. So this is
just a dictionary where you have one word translate into another word with a with a particular
probability and that is actually very effective at helping get rid of some of the crazy results that
you get because basically it gives the neural MT system a very good hint about how it should be
translating each word. And you can use that to bias the probabilities that it's using. And that
helps your translation of content words, for example, it helps not translate random content words
into random other content words like we got an example in our corpus where translated Tunisia into
Holland. Because you know, there's similar semantically but or Tunisia into Norway, sorry.

</Turn>


<Turn speaker="Graham Neubig" timestamp="16:29">

I made the same mistake neural MT system did. But yeah, basically yeah, so there's that method.
There's a couple of other methods that kind of follow up on that or expand it to doing phrases or
are trying to expand it to doing phrases as well. And that's particularly effective when you don't
have very much training data. So if you have a very small amount of training data, then phrase based
systems can still be competitive or even better than neural MP systems. But incorporating something
like that does raise the level of the neural MP system to be about the same or better than the
phrase base system, even when you have a much less I think it's really important and it's something
that people will continue to be thinking about I imagine.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:19">

Cool. And are there any tools that people should be able to use out of the box in order to do neural
machine translation now? Like a cdec and the other phrase based machine translation systems.

</Turn>


<Turn speaker="Graham Neubig" timestamp="17:33">

So there are a lot of tools. Maybe the most widely used ones are open NMT by Harvard and Nvidia by
Edinburgh. Of course I'm making my own toolkit called XNMT which is kind of designed to be a
research based tool kits where you can try new ideas quickly. There's also a number of very nice
releases by Facebook and Google recently where Facebook has their new method of translating using
convolution. And Google has a new method translating basically using only attention operations and
not using recurrent neural networks, which is kind of a, both of those are kind of new paradigm. So
I haven't actually tried those tool kits out myself. But it's high on the list of the things that I
want to try to use.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:34">

Interesting. So I can imagine how you could use attention only to substitute for RNNs. I'm not sure
how, so does the Facebook model just replaces RNNS with CNNs to aggregate the asthmatics across the
sentence?

</Turn>


<Turn speaker="Graham Neubig" timestamp="18:54">

Yeah, basically, and actually the two ideas came out within a month of each other and are similar in
concept and different in implementation. And basically the idea is we don't want to use recurrent
neural network because that locks us into calculating one word at a time as opposed to calculating
for the entire sentence. At the same time. And if you can calculate a single operation for the whole
sentence, you can think about how much faster that would be on hardware like a GPU for example. So
the Facebook paper is Convolutional Sequence to Sequence Learning and the Google paper is Attention
Is All You Need. So those are two nice papers to check out.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:46">

So transitioning into that paper one of the problems with neural machine translation is that we have
to do this giant softmax to predict the next word in the target sentence. Could you tell us a little
bit more about this problem and what are previous attempts to solve this?

</Turn>


<Turn speaker="Graham Neubig" timestamp="20:04">

So the basic problem is that we have a large vocabulary in our targets in our target language it
might be anywhere. If we're using words as our targets, it might be anywhere from 40,000 to 80,000.
And then we turn everything else into unknown words and we can't translate the unknown words very
well. As I mentioned before, sub word models are very popular now. But even with sub word models,
we're still calculating 8,000 to maybe 32,000 words in our target vocabulary. And when we do so we
to do a big matrix multiplication over all of those things in our targets. And then we have to
calculate the the probabilities of all of those words using a softmax function. And that can be very
costly and it's particularly costly. If you're not using a GPU. So let's say you wanted to deploy a
machine translation system on a mobile device or something like that.

</Turn>


<Turn speaker="Graham Neubig" timestamp="21:17">

Obviously, you know, maybe mobile devices of the future will have Nvidia Teslas in them, but they
don't at the moment. So in order to do that, you want to limit the amount of time that this takes to
get your translations more quickly. So that is the problem. You know, the big softmax is slow in
training. It's slow and testing. It also has a lot of parameters because you have parameters for
each of the a big parameter matrix where you have one vector for each of the output words. So the
goal is to make that more computationally efficient and more compact. And I guess there's a lot of
previous work on that before our paper at ACL. And you can do things like calculating a class, a
word class first and then a given the class calculate the profitability of the word or you can also
do things like at training time sampling some negative examples.

</Turn>


<Turn speaker="Graham Neubig" timestamp="22:31">

So you don't use all of the words as negative examples, but only use a subset. But up until now,
none of these methods have been basically fast at training time, fast at testing time and parameter
efficient. And also a lot of them are kind of difficult to implement on the GPU which is very, very
important for training large models. So the idea behind our paper is very, very simple in a way. So
normally what we do is we assign each word in the targets a particular ID, right? So the words
"the", or maybe the unknown word symbol might be word number zero. And then the word "the" might be
word number 10 or "a" might be word number 15. And then we have "dog" and "cat", and they all have
their word IDs, right?

</Turn>


<Turn speaker="Graham Neubig" timestamp="23:36">

So what we're doing in this paper is instead of predicting the word ID as one element of this big
softmax. We're just the bits of the word ID. So if you have, I think most people listening are
familiar, but if you have a large vocabulary of 1 million words, basically that is two to the 20. 1
million is a little bit less than two to the 20. So you can express all of those words in 20 bits.
So instead of calculating over those 1 million words, instead we calculate 20 bits and our
calculation gets much much, much faster. And it's easy to run on the GPU. It's fast. Even on the
CPU, we got a 12 time gain in speed on the CPU for example. So there's a lot of fine details and
stuff.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:37">

So this sounds like there have been, as you said, these class factors softmaxs or hierarchical
softmax and this feels like it's pushing the hierarchical softmax to its nested extreme, like would
this type of binary branching all the way to the bit.

</Turn>


<Turn speaker="Graham Neubig" timestamp="24:56">

So, exactly. And it is the hierarchical softmax with one constraint. So the hierarchical softmax is
a generalization of this binary code, the binary code thing that I talked about here. So the
constraint is that in the hierarchical softmax you have a tree or a binary branching tree. And if
you additionally add the constraint that at each level, if the node with depth one, all of the nodes
with depth two all the nodes with depth three share their parameters, then that will be the same as
our method essentially. You might need a whiteboard or a piece of paper to work it out. But these
two things are essentially exactly the same.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:44">

Yeah, that makes sense.

</Turn>


<Turn speaker="Graham Neubig" timestamp="25:45">

So that has huge computational advantages, but it also reduces the expressivity of the models. So we
have to have a couple tricks to get it to work properly.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:57">

I remember talking to some people about trying to be smart in these hierarchical softmaxs, about how
you cluster words so that the hierarchy is more efficient. When you described this though, it
sounded like you're just taking the word ID and taking it's bit representation and not doing
anything particularly smart. Is that, is that true?

</Turn>


<Turn speaker="Graham Neubig" timestamp="26:17">

So actually there's a small footnote in our paper that explains about this that you'll probably miss
if you don't look carefully. But we did try a couple smart things about how to cluster things. And
the basic idea is that perhaps if the, if each bit had some sort of meaning it would be easier to
predict. So for example nouns tend to be, have their third bit be one and then everything else tends
to have its third bit be zero or something. And I think the basic concept is a good idea. But we
tried several incarnations of this where we basically clustered words together using conglomerative
clustering based on their word to vec vectors or a couple other things in that thing. And nothing
ended up working better than just having word IDs that were sorted according to word frequency. So I
think there's definitely room to improve on there, but we we weren't able to immediately get that to
work.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:29">

Interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:29">

So one of the potential problems with this method is that even changing, even getting only one bit
wrong will throw you off in a completely different space right. So you discussed two methods in the
paper to adjust this. Could you tell us about these?

</Turn>


<Turn speaker="Graham Neubig" timestamp="27:49">

Yeah, certainly. So that's a very, so this was a very good lead in. So basically the first method
that we use to solve this problem was a thing called error correcting codes. So error correcting
codes are, the idea is instead of taking your 1 million word vocabulary and shoving it into 20 bits,
you add some redundancy. So instead of making it so every single bit string is equivalent to a
particular word you make it. So instead of using 20 bits, you use maybe 30 bits. So once you change
your 20 word vocabulary or your 21 million word vocabulary into 30 bits, there are suddenly a lot of
strings that don't mean anything. Basically a lot of strings that aren't any particular word. And
then the idea is you predict the bits of the output word and when you get something that doesn't
correspond to any particular word, you find the word that's closest in that bit vector. And so,
yeah, I guess, I guess it's like the the Hamming distance. You can think of it as the having the
true bit vector that has the lowest Hamming distance from the other ones from the vector that you
actually predicted. What we actually did was something a little bit more involved using something
called convolutional codes which have a variety of good properties. But basically the idea is add
redundancy and then and then try to recover the original string when you're a little bit off.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="29:42">

So how well does this work?

</Turn>


<Turn speaker="Graham Neubig" timestamp="29:46">

So that particular method is absolutely essential to making it work. I actually realized they don't
have the results table with me now, so I could pull it up while I continue talking, but that is
absolutely essential. But it doesn't get us all the way to just using the accuracy that you get from
just using the softmax. So the next thing that we needed to do is, we kind of gave up a little bit
on just predicting the the bits and instead for the top N most frequent words, we predict them
directly using the softmax. And then for all of the other words in the vocabulary, we predicted them
using the binary, the binary codes that we mentioned here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:41">

And when you say N, how much is N, like a hundred, a thousand or so?

</Turn>


<Turn speaker="Graham Neubig" timestamp="30:47">

So we have a figure in the paper where we vary, but basically we, tried with 512 and 2048. And it
depends on the datasets. If you have a dataset with a slightly smaller vocabulary, than 512 was
enough. Otherwise 2048 was enough to get you pretty close to what you had before. So for example,
decoding speed on the CPU and looking at the paper now compared to just using the binary error
correcting codes is about 1.3 times slower by doing this change. So it does make it a little bit
slower, but still compared to the 12th fold decrease that you get from just using the regular
softmax, it's not a huge sacrifice.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:48">

So backing up just a little bit, the binary, the error correcting codes, does that have any, does it
make a difference at training time or is this only something that you do at test time

</Turn>


<Turn speaker="Graham Neubig" timestamp="32:01">

Only testing. That's not to say that if you were really clever, you couldn't come up with a way to
do something at training time. I think it'd be really cool if you could. But yeah, for our paper
it's just at test time.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:15">

Okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="32:17">

That's good. So in that paper you mentioned that one of the problems with previous solutions for
this problem for example, the hierarchical sofmax is that it's not efficient to do this in a batch
GPU machine. Could you explain why is the case and how does the proposal fix the problem?

</Turn>


<Turn speaker="Graham Neubig" timestamp="32:44">

So the hierarchical softmax, the problem there is basically when you do many batching in neural
machine translation, the way you do it is you snap together multiple sentences. And then at the same
time in a single GPU operation, you predict the first word. Then in another GPU operation you
predict the second word. And the difficulty in getting that to be efficient is basically, if you
remember the hierarchical softmax, you have this branching this tree structure where you're
predicting whether you go up or down at the first one, then you're predicting whether you go up or
down at the second one. But because these predictions don't share parameters among the various nodes
in the tree, basically they are not, in order to get the parameters in the correct shape to perform
this prediction, you have to do a lot of moving memory around.

</Turn>


<Turn speaker="Graham Neubig" timestamp="34:06">

It's definitely not anywhere near, it's not anywhere near trivial to make sure that you can get the
memory in the correct shape to make all of these predictions at once. It's even worse when you're
actually trying to generate predictions because when you're trying to generate predictions, you
actually have to calculate the entire tree and not just the path along the tree that leads to the
word that you're trying to predict. So because of this, it's just like, it's not impossible to
implement, but it's very highly likely that you won't want to be doing that yourself. And it will
definitely be slower than our proposed method where it's basically just a single matrix multiply
followed by a sygmoid function to predict zero one for each bit.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="35:02">

So another method that people talk about a lot as noise contrastive estimation. My understanding is
that we can only use most confesses mission while training. You cannot really use it speed up things
at testing time. Could you explain this or elaborate a little bit so that the audience knows what
we're talking about?

</Turn>


<Turn speaker="Graham Neubig" timestamp="35:20">

Yeah. So basically noise contrastive estimation. And there's also kind of a group of methods that
are all ` sampling based methods, sub sampling based methods for training neural network models. And
the way these methods work is when we train a neural network model. Basically we want to raise the,
or a neural machine translation model for example, or language model. We want to raise the
probability of the actual next word and decrease the probability of all the other words in the
vocabulary. But in order to do that, we need to calculate the scores of all the words in the
vocabulary. So sampling based methods instead of calculating for all the words in the vocabulary,
calculate for a sub set of those scores and they randomly sample these negative examples. And that's
a good method for training time because instead of using, you know, a million words, you just
randomly sample 50 words that you want to be using as your negative examples. But the bad thing
about this method is at test time, you still need to calculate the scores for all of the words
because you need them to decide which word you want to be out putting next? So in general, you can't
use specific test time in a neural machine translation systems.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="36:52">

Cool. I think that's all for this paper. Did you have any last thoughts about either this paper or
machine translation in general that you'd like to mention?

</Turn>


<Turn speaker="Graham Neubig" timestamp="37:07">

I think, well, my thought about this paper is this paper is super easy to implement, so everybody go
and try it out and find the problems and tell us or fix them yourselves. I think it's a fun exercise
that you can do. Machine translation in general. I think, I guess it's just reiterating what I said
at the beginning. This is a very exciting time to be a machine translation researcher because I
think you know, we're getting to the point where MT is usable in a lot of languages. But it's by no
means perfect even in the very big languages. And there's still a lot of work to be done for domains
where we don't have data or languages where we don't have very much data. And it's easy to engine
your new models using the frameworks we have now. So yeah, I hope people continue to be interested,
new NLP people who are listening take that as an interesting problem to work on.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="38:12">

Excellent. Thank you very much for joining us today, Graham.

</Turn>


<Turn speaker="Graham Neubig" timestamp="38:15">

Yeah, Thanks alot for having me.

</Turn>
