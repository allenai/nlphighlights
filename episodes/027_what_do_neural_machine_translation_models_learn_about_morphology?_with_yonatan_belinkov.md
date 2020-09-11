---
title: "What do Neural Machine Translation Models Learn about Morphology? with Yonatan Belinkov"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Yonatan Belinkov"]
number: 027
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:12">

So our guest today is Yonatan Belinkov. He is a PhD student at MIT working with Dr. James Glass. His
current research interests are in developing and understanding vector representations for language,
especially based on neural network models. It's a pleasure having you with us today Yonatan.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="00:32">

Hi, thanks for having me.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:36">

So that paper we're going to talk about today is called: What do Neural Machine Translation Models
Learn about Morphology? Could you give us like a brief overview on the paper?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="00:49">

Sure. So our main goal in this work is to understand what's going on inside a neural network models.
And the motivation is that often these models are thought of as a black box. So maybe you train them
on some tasks using some dataset and you evaluate the performance on a downstream task and you get a
number, then you tweak the model, you train it again, and you get a different number. But, so the
model presumably does better, but what has it learned and why is it doing better is not as clear. So
we were interested to understand what's going on inside machine translation models. Specifically
neural network models for machine translation and what they are actually able to learn about the
language, the source language and the target language while they are being trained from a dataset of
parallel sentences.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="01:46">

And the methodology that we took is pretty straightforward. So the idea is to first take a standard
machine translation system and train it on large amounts of sentences then extract some hidden
representations from this pre-trained model. So these may be, for example, activations of the or
current neural network at every word. We extract those representations and we think of them as
features that represent something about the word as learned by the machine translation system. Then
we want to evaluate the quality of these representations for some tasks. So we define a much simpler
task. For example, part of speech tagging and we train a classifier to predict part of speech
tagging for every word based on those features that we extracted from the machine translation
system. So at this time we do not update the weights of the neural machine translation system.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="02:52">

So after training them, it's frozen and we do not touch them anymore. So we only train our simple
classifier on a supervised dataset and evaluate the quality of the classifier on the supervised
dataset on the test set. And the assumption behind this procedure is that the quality of that
classifier can tell us something about the input features. So if we have good input features, we can
train a good classifier and that in turns tells us something about original machine translation
system. And what it has learned for the given task that we are evaluating the classifier on.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:31">

Sounds like a very simple procedure. And I'm quite surprised that people haven't tried doing this
before. The closest thing I I know off which is kind of related but not quite is the work that Yulia
Tsvetkov in CMU. She did some work on evaluating word embeddings but the word, so the idea there is
to have a number of words, a set of words for which you know some linguistic information. So maybe
they're part of speeches or their morphological class but they are out of context and you're only
evaluating the word embeddings that are evaluated that are estimated maybe using word2vec or another
method, but not in side another task. And then what she does is she aligns the embedding dimensions
in the embedding vector with the dimensions that represent the various linguistic information about
these words. And tries to find the, if you get a better alignment between these dimensions and the
linguistic features then she would assume that these embeddings are good at representing these
linguistic phenomenon.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="04:58">

Right. So I think a number of people had worked on evaluating word embeddings for specific tasks
using, so the work you mentioned is one way to do that, a slightly different way to do that similar
to our methodology would be take the word embeddings coming out of word2vec or GLOVE or whatever and
try to predict some properties using again a classifier. So people like Arne Köhn from Hamburg
University had done that on a number of syntactic tasks. And I think there was also work byPeng Qian
at Fudan University doing a similar things, but you are right to mention that these works do not
consider the context of the sentence, which I think is very important for many tasks. I should say
that similar methodology was also used by other people. So for example Xing Shi, Inkit Padhi, and
Kevin Knight from USC had worked on machine translation and they looked at what's going on with
syntax in neural machine translation using a very similar methodology. So this is work from a
previous EMNLP and I found some interesting things about English syntax.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:20">

I guess there are a couple of papers that are very recent around the same time that you've been
doing this work that do very similar things. So Matt Peters and Waleed Ammar have an ACL paper. The
goal isn't to examine what the model learns as much as use learned representations in some
downstream task. So the goal is maybe a little bit different but the model and how everything is set
up is exactly the same where you train some other model in these other cases a language model and
fixed the representation and you apply it in some downstream task, in their case named entity
recognition. And then there's also the unsupervised sentiment neuron by folks at OpenAI

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:05">

Yes, I would say the main distinction in my opinion between this line of work and that is the goal.
The goal here is to examine or to really like understand the model for machine translation, the main
tasks better, and this other sort of task part of speech tagging is only used for that purpose while
in my paper in ACL the goal was to improve the other task, which was sequence labeling and using the
language model in order to achieve that. So I think that's,

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="07:43">

Yeah, I think, I think that's an important distinction. So we actually do not really care if we are
able to get a state-of-the-art morphological tagging performance. So that's not so important. I
mean, it's nice to see, and our results show that some of these hidden representations found in
machine translation system are very strong and they do get pretty nice results. But our goal is not
to improve the state-of-the-art on morphology or part of speech tagging, but use this evaluation is
the way to get some insight into what's going on inside the machine translation system.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:16">

Yeah. The reason I bring this up, I think your work is really interesting and it's in this line of
work on representation learning, right? Where everyone, it seems like, well not everyone, but a lot
of people these days are trying to understand the limits of representation learning in neural nets
and can we come up with models in a nice way to do general representation learning that helps with a
wide variety of tasks and your work fits really nicely in that line. Even though it's like, I guess
it's more explicitly studying the representations then performance on the downstream task, which is
interesting

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="08:48">

Right and I think the two are kind of related. So like a longer term goal of, of our work is that if
we understand these representation better, we can improve representation learning for some like real
world tasks. Right? So we're hoping we can understand what's going on the MT system better maybe we
can improve the machine translation system and we do have some followup work that is still, it's
still not out where we show we can improve the decoder based on some of the insights that this work
has has given us.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:21">

Cool. So can you tell us a little more detail about the model for a neural machine translation?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="09:27">

Sure. So we use a pretty standard machine translation system, which is composed of an
encoder/decoder framework with an attention mechanism. So the idea is you represent words as
vectors, as word embeddings. These are randomly initialized in the beginning. And then you go over
the words one by one using a recurrent neural network. We use an LSTM long short term memory
network, and you encode each word into a hidden representation and at the end of the sentence, you
get a sentence representation which you can use in order to feed into the decoder. So the decoder
takes this hidden state and starts predicting the target words in the translation, again word by
word. And the only main addition to this is the attention mechanism, which allows the decoder to
focus on different words in the source sentence dynamically as it proceeds through the decoding of
the target sentence. So that is the main that is the framework which has been around for a couple of
years now and it's doing pretty good results on machine translation. The particular architecture
that we use was a two layers of an LSTM, pretty shallow, but we also use kind of not super big
datasets. So we found that that was enough.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:54">

And the target words are generated with a softmax or a, is [inaudible]?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="11:00">

Yes, yes. Target words get the softmax, vocabulary I think, I think we took like a default in one of
the, in the tool that we were using which is seq2seq attend by Harvard. So it was 60,000 words on
each side.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:16">

Right, so can you tell us more about the tasks that you use to investigate the model's ability to
learn morphology?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="11:23">

Yes. So we focused on morphology and we specifically chose languages where morphology is more of an
issue. So our languages that we experiment with were Arabic, Hebrew, Czech, German and French. And
we train translation models from into English with these languages. So morphology is an issue in
these languages because have we a dictionary, a word or lemma have multiple forms so that's
something that's fortunate. System can be pretty difficult cause we have so you have sparsity on the
source side if you're translating from these languages. But also on the target side, if you're
trying to generate the correct morphological form, that could be kind of challenging. So the tasks
that we evaluated were first part of speech tagging, which is basically just concerned with for
every word saying if it's part of speech is a verb or noun or an adjective.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="12:26">

And so on, a very simple task, but also kind of a core task to start with. And we also look at
morphological tagging, which in addition to identifying the part of speech is also concerned with
finding features like for a verb saying if it's a past tense, present tense what's it's person,
gender, number and so on. So in some of the languages that we experiment with, this leads to very
complex text sets. So we have like, between hundreds of possible tags to thousands of possible tags.
So it's a pretty, it could be a pretty challenging tasks.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:06">

Which language had the largest number of morphological classes?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="13:12">

I think you can guess.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:15">

I mean several of these are actually quite morphologically complex, so I'm not sure.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="13:22">

Yeah, well, I guess it also depends on the, on the datasets, but Arabic in our case had about 2000
tags, possible tags that we have seen in the training set, so that was the most, that was the
largest number of tags. And I should say that in addition to the neural machine translation system,
which is like taken for granted, we had to decide on an architecture for our classifier that does,
that predicts the part of speech or the morphology, which in our case was a simple feed forward
neural net with just one hidden layer. So we specifically wanted to take something which is as
simple as possible. So we are able to focus on the quality of the representation and not on some
issues like context or other things.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="14:11">

Yeah, that makes sense. So what are the main findings based on this inspection?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="14:17">

All right. So we looked at several factors in the neural machine translation architectures or
basically design choices that one has to consider when coming up with those systems. So one was what
kind of word representation is used. So we compared simple word based representation, which means
you take every, word in the vocabulary is represented as a vector. And we also looked at a character
CNN, a convolutional neural net over character embeddings. So every character in your alphabet is a
vector and then you can run a CNN on the character embeddings for every word and generator a word
vector representation, then continue with the machine translation system. So we took these two
different kinds of representations, trained a machine translation system, and then checked the
quality of those representations for morphology. And the main finding is that for these languages
using a character CNN leads to much better representations for morphology, it also improves the
translation quality if you measure BLEU which makes sense. I mean you improve the presentation
qualities so you're able to generate better translations.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:38">

So it's common to use both word level and character level embeddings, did you try doing that?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="15:45">

No, we have not combined. I think that's, that makes sense. So one thing we've seen is that these
two behave differently with different frequencies of words. So the character based embeddings are
especially helpful with low frequency words, which makes sense. I mean if you've not seen the word
match, you don't know, you don't really know what to do with it if you don't look at characters. But
if you go to very high frequent words they don't really help. So the, the word based embeddings are
kind of enough. So I think, yeah, a combined character word model could maybe use the benefits of
both of these.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:27">

Looking at the graphs in your paper in figure 2 where you show plots of word frequency versus
accuracy, comparing word level models versus character level models. It doesn't look like there's
any place that the word model dominates. Like I'm not sure that you get anything at all.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="16:46">

Yeah. I don't think it does better than the character based model, but it's as good, you know?

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:52">

Yeah. It just makes me wonder what benefit you would get from combining them because there isn't an
obvious spot in there where the word, the word model does better than the character model.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="17:02">

Yes, that's a good point I think. So. I can't, I don't have those results here, but I can tell you
of some anecdotal results where I've seen that a character based model actually fails compared to a
word based model. So this, can happen in cases where you look at subsequent like sub strings of
words and you get a false impression of similarity to other words. So a character based model can
find like presumably similar words, but they may not have the same meaning. And I've seen it when I
worked on Arabic before it's kind of an acute example. So it's anecdotal, but it may be so that
could explain why sometimes it makes sense to combine these two.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:46">

Okay. I know the motivation in other tasks like question/answering for combining the two is to
better handle like named entities things that are words that are totally out of vocabulary. And I
don't follow machine translation as much, so I'm just not even like, do people actually do this in
machine translation, it's really common in question/answering to use this concatenation, but I don't
know if it's common.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="18:09">

Well, I've seen it explore, I think there's work by Kyunghyun Cho at NYUthat does a combination if
I'm not mistaken. What is maybe more common nowadays is to use a sub word unit like BPE byte pair
encoding. So it's an unsupervised way to split words into some sub words, which don't really have a
meaning. So in practice that's what's done like in many systems including Google translate.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:41">

Interesting. Another thing that I thought was just a little bit surprising in your architecture
decision was that you only had a uni-directional LSTM instead of a bi-directional LSTM is, it's
another point where I wondered if that's just a common thing in machine translation that I'm not
familiar with, but it's really common everywhere else.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="18:58">

No, I would say the common thing to do is have a bi-directional LSTM also in machine translation at
least for the first layer, maybe not, not all of them. We have tried it in other experiments and
we've seen overall maybe better results using a bi-directional encoder, but qualitatively or the
relative performances are kind of similar so we don't get different insights. You just get slightly
better numbers.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:26">

Right. So, yeah. This, this lets you run some interesting comparison experiments cheaper without
really changing the result, which is nice.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="19:35">

Yep.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:36">

So we have a figure that shows the increase in accuracy for various classes when you use character
as opposed to a word based representations. Do you have any comments like the biggest increases or
the lowest increases?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="19:57">

Yeah, so we were also interested in seeing if there are certain tags or certain word classes where
character base models are especially important. And we found that they are specially helpful with
nouns. And in particular with plural nouns. And this is an interesting point because, so this
particular plot that you're referring to is looking at the Arabic data. So in Arabic, the nouns and
the plural nouns have usually are marked by certain suffixes, right? For the masculine plural, you
have certain suffix. So you take the, you take the singular form and you add a suffix and you get a
plural form. And it's nice to see that the character based model is able to capture these patterns
in the data and really improve upon the word based models. So that's one factor that we've seen.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="20:52">

The other kind of nice aspect that we've seen is that determiners are captured better by the
character based model. So these are tags where you have something like a DT+. So DT+N is a
determiner plus a noun. So in Arabic, again, the determiner is joined to the same word and it's
marked by two letter prefix. So a word based model doesn't really know how to distinguish between a
noun with a determiner or noun without a determiner, but a character based model has this ability.
So it's nice to see that, some of these tags are better captured by the character based model.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:37">

I guess this makes me think of how we used to do tagging and other kinds of things back before the
days of neural nets, before these were popular. And you would just write some feature extractors
that essentially had an indicator feature for every possible three character suffix or three
character prefix. And that captures, you would think essentially the same information that we're
getting these days with these character-based RNNs where the benefit hopefully is that we don't have
to actually write these down by hand. But I wonder if the CNNs are actually learning something more
than what we learned previously. That just struck me as an interesting experiment. You could do like
extract a bunch of features from a bunch of words using previous code that did this feature
extraction and then find correlations, remove the correlation from the CNN representation with all
of these features and see what's left. I don't know, just another way to try to tease apart what's
going on here versus what we used to do back in the day.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="22:36">

Yeah, that sounds like a cool investigation.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:40">

So there is also an investigation for the encoder depths. Are there any comments you want to make
about the results here?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="22:48">

Yes. So that's the second aspect that we've looked into. So how deep do your representation is in
the Neural machine translation system. And the motivation here is to see what's going on in
different layers. So maybe lower layers learn different kinds of information than higher layers. And
the main finding we saw is that, well, first it makes sense to just use representation about the
word embeddings. So if we only take the word embeddings and try to project something, we're not
doing that great. But once we use at least the first hidden layer, we are able to perform pretty
well. Perhaps more interesting is the fact that if you go to the second layer, you don't improve
your performance on morphology. So it turns out that the first layer is actually doing better than
the second on the tasks of part of speech tagging and morphological tagging. So to me this was,
yeah,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="23:51">

I find the fact that a layer one is getting better results then layer zero to be interesting
actually, because most of the time the word, even though like some words change their morphology or
the part of speech that should be assigned to them depending on context. Most of the time words that
are common in a particular class will often appear in this class. So I would have thought the layer
zero, the word level representation without including any context to give good enough results, but
the results are showing otherwise,

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="24:29">

Yes. I think the context turns out to be pretty important. And you know, even like plain old HMMs do
use context, right? To predict part of speech tags.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:42">

And words that are written the same but have different meanings like read and read or whatever. You
have to have context in order to distinguish the morphological tack. Right?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="24:55">

Definitely.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:57">

And this particular experiment is one where I wonder if you would see different results if you used
bi-directional LSTMs instead of uni-directional LSTMs.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="25:06">

So the answer is the answer is no. So I don't show it in the paper, but we've done this experiment
and the results are, the trends are the same. So layer one is better than layer zero, but it also,
it's also better than layer two.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:22">

Interesting.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="25:23">

I think that's an interesting point because sometimes we think that deeper is better, right? And,
here's a case where certain information is better captured in the lower layer, in layer one, and
then it is captured in layer two.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:38">

Yeah. If you think of an analogy to what people do with a computer vision and ImageNet, you wouldn't
really want to take the representations from the top layers of your VGG model and use that to
predict edges. Whereas the lower hidden layers are much better at predicting edges because that's
what they're finding. Right. So this actually makes a lot of sense.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="26:03">

Yeah, I think that's a very good point. And this raises the question of what is actually being
captured in the top layers in the machine translation system, like compared to the you know,
division analogy, is there some more global property that is maybe captured there.

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:23">

Do you have any good idea of how to test what that would be?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="26:27">

So, yeah. Well one way to do that and that's something that we've been working on in followup work
is to use a similar methodology but define a different kind of tasks. So instead of looking at
morphological tasks, we could look at semantic tasks or syntactic tasks and we have preliminary
results that show that for semantic tagging tasks more information is captured in the higher layers
of the network then in the lower layers which kind of aligns with what we might expect. So I think
that's nice.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:02">

Cool.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:03">

Nice. So this work is in collaboration with QCRI, I'm curious to know how this collaboration came
together and how it's working.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="27:11">

Yeah, so this work is with a number of people, Nadir Durrani, Fahim Dalvi, and Hassan Hassan all
from QCRI and of course with my advisor Jim glass.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:26">

Sorry, QCRI. What's that?

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="27:28">

Yes, that's the Qatar Qatar Computing Research Institute. So it's it's a computer science research
Institute in Qatar which has a fairly large number of people working in all sorts of fields of
computation. And they have a major group working on Arabic language technologies which we have been
collaborating with for a number of years and more broadly. MIT has an ongoing collaboration project
with QCRI that's been going on for several years now in in various fields of computer science. And
our work is part of the language technologies group there that is working on a couple of different
things.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="28:16">

So there are people that are working on community question/answering and we've been contributing to
this work in a number of iterations of SemEval competitions and in other publications. And there's
also a lot of work on speech recognition, especially of Arabic including different Arabic dialects
that are as you know, are very difficult to recognize. And are often very different from each other.
And finally there's another group of people that are working on machine translation. So this
particular paper has been done in collaboration with them.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="29:00">

Excellent. Thank you very much for making the time to record with us. It was a great pleasure having
you with us.

</Turn>


<Turn speaker="Yonatan Belinkov" timestamp="29:07">

Thanks for inviting me.

</Turn>
