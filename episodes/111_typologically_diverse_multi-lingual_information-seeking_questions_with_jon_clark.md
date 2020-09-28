---
title: "Typologically diverse, multi-lingual, information-seeking questions, with Jon Clark"
hosts: ["Waleed Ammar","Matt Gardner"]
guests: ["Jon Clark"]
number: "111"
tags: []
description: "We invited Jon Clark from Google to talk about TyDi QA, a new question answering dataset, for this episode. The dataset contains information seeking questions in 11 languages that are typologically diverse, i.e., they differ from each other in terms of key structural and functional features. The questions in TyDiQA are information-seeking, like those in Natural Questions, which we discussed in the previous episode. In addition, TyDiQA also has questions collected in multiple languages using independent crowdsourcing pipelines, as opposed to some other multilingual QA datasets like XQuAD and MLQA where English data is translated into other languages. The dataset and the leaderboard can be accessed at https://ai.google.com/research/tydiqa."
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Ammar and Pradeep Dasigi.

</turn>


<turn speaker="Matt Gardner" timestamp="00:10">

All right. Today our guest is Jon Clark, who is a research scientist at Google in Seattle. Jon,
welcome to the program.

</turn>


<turn speaker="Jon Clark" timestamp="00:16">

Thanks for having me. I'm excited to be here.

</turn>


<turn speaker="Matt Gardner" timestamp="00:18">

Last episode we talked with Tom Kwiatkowski and Mike Collins about natural questions and today we
wanted to talk about something that's very related that more recently came out called TyDi QA and
Jon, do you wanna give us a brief introduction to what this is?

</turn>


<turn speaker="Jon Clark" timestamp="00:33">

Yeah, so TyDi QA is a multilingual question answering dataset with two distinguishing
characteristics. First, it's questions are information seeking, meaning that the questions are
written by people who want to know the answer but don't know the answer yet. And second, the
languages are typologically diverse from each other.

</turn>


<turn speaker="Matt Gardner" timestamp="00:53">

Yeah, so natural questions, I guess when you think of most reading comprehension or question
answering datasets today, almost all of them are in English. So the SQuAD, the ones that I've been
building, DROP, co-ref, ropes, newsQA, triviaQA, hotpotQA. You could go on and on and on. And very
recently people have started thinking, Hey, we should be thinking about other languages too. And
you've got your own take on this. So I guess the first question is why do we care about other
languages? I mean, come on.

</turn>


<turn speaker="Jon Clark" timestamp="01:26">

Yeah. So first off, the idea of typological diversity comes from the notion of typology and
linguistics. Languages express meaning in different ways, and typology categorizes these differences
as structural and functional features. So for example, in English, if you have one book, you say
book. If there's two, you say books. We've added this tiny bit of morphology on the end, the S and
so we say the English expresses the plural. Arabic is even more interesting. One book is kitab and
many books is kitub, but if there's two of something, there's yet another specific form of the word,
kitaban. Forgive me for my pronunciation. So we say the Arabic expresses not only the plural, but
also the duel. So that's one typological difference between English and Arabic. There's all sorts of
different typological features ranging from preferred word order to how morpho syntax and codes
grammar to whether or not a language encodes gender.

</turn>


<turn speaker="Jon Clark" timestamp="02:29">

So that's what typology is. Why should we care? I think this has a lot to do with a question you've
been asking a lot recently. Matt, when will we know when our algorithms can really read and answer
questions? My take on this is that even if we're doing perfectly in English, we still wouldn't be
there. It's entirely possible that we might design our models in a way that overfits the specifics
of English. So I want to know can your model handle the non spacing issues in Tai? Can it cope with
the rich morphology of Russian, the free word order of Japanese, the compounding in Finish. I really
want to be able to study how modeling interacts with all of these and I believe that as a field,
these are things we have to keep our eye on as we evolve our model architectures.

</turn>


<turn speaker="Matt Gardner" timestamp="03:19">

Yeah, I agree. That was, that was a really great articulation from a science perspective there are
really compelling reasons to think about other languages because our assumptions about tokenization,
about how we model attention between words and a transformer or whatever, like it's not at all clear
that any of these assumptions transfer to other languages. And so having datasets that push us on
that are really important and you gave a good reason why. We should be clear to say that the even
more obvious motivation that I was kind of joking about earlier is that people speak languages other
than English, surprise. And especially like you work at Google and Google tries to serve lots and
lots of people all over the world, including the majority of which don't speak English. Right?

</turn>


<turn speaker="Jon Clark" timestamp="04:03">

Absolutely. And for me that is another big part of this. It's about helping real people. These days
you can ask a question to a voice assistant, you know, you can type your question into a search box
or what have you. And as long as you speak English, you can kind of expect to get an answer. It
works pretty well, but there's 7,000 languages out there actively spoken. And so there's a lot of
languages where this just doesn't work too well yet, and the idea behind TyDi QA really is that if
we can develop models that generalize across many of these important typological features, then
maybe we have a chance of making progress across many of these languages at once.

</turn>


<turn speaker="Matt Gardner" timestamp="04:40">

Okay, so say we want to build a multilingual typologically diverse dataset, how do you go about
doing it?

</turn>


<turn speaker="Jon Clark" timestamp="04:47">

So the way we collected TyDi QA is to start from the very beginning at question elicitation. We did
everything directly in each target language, so to inspire questions, we showed people an
interesting passage from Wikipedia written in their native language and we then had them ask a
question. Any question with two small provisos first the question can't be answered by the prompt.
And second you actually have to want to know the answer to the question. Maybe these things seem
obvious, but it actually changes people's behavior a fair bit to encourage them to ask something.
That's interesting. I see this as kind of similar to how your own curiosity might spawn questions
about interesting things that you see just walking down the street. We encouraged our question
writers to let their imaginations run. So does a passage about ice make you think about popsicles in
the summer. We said, fine, great. Ask who invented popsicles. From there we run a Google search on
each question we find the top ranked Wikipedia article in the target language and then our
annotators comb through the entire Wikipedia article and try to find a passage to answer the
question, if there is such passage, they mark it and then they're also welcome to highlight and
minimal answer if possible. This is kind of the part that you might imagine gets boldfaced when
we're showing this passage answer to some user.

</turn>


<turn speaker="Matt Gardner" timestamp="06:09">

So you said in there that getting people to ask questions that they actually want to know the answer
to changes their behavior. Do you have any evidence for that? Like did you, did you try collecting
things in different ways or is this just intuition?

</turn>


<turn speaker="Jon Clark" timestamp="06:22">

So we did several pilot studies when we were getting this thing off the ground and initially what we
found is that people kind of fall into all sorts of degenerate modes of asking questions. First of
all, they think that they should be asking questions to a conversational partner because this is
perhaps something that we're used to doing with our own lines of questioning. And second, they are
likely to just ask the same templated questions over and over unless you tell them no, no. Ask me
something that you're curious about.

</turn>


<turn speaker="Matt Gardner" timestamp="06:53">

Yeah. So you said a conversational partner. Do you mean like you ask questions that depend on each
other? Is that what you mean?

</turn>


<turn speaker="Jon Clark" timestamp="06:59">

Exactly. So something like, "what's your favorite book" or "how are you doing today?" We explicitly
did not want to focus on those sorts of questions.

</turn>


<turn speaker="Matt Gardner" timestamp="07:08">

Okay. Yeah, that was, that's different than I expected. I was thinking you meant like sequential
questions, but you mean like dichotic questions, things that have pronouns that refer to you or me
or this kind of thing. Okay.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:19">

This [is] actually related to some observation I had when talking to older people about like
question answering systems they use like and things like Google home. The actually very often think
that there's a person who is answering the questions like they actually think there's a human on the
other end somehow. So I think that's, this might relate somehow.

</turn>


<turn speaker="Jon Clark" timestamp="07:42">

Yeah, perhaps and honestly I would be perfectly happy if people were to begin thinking about
question answering systems in this way. It would mean that we've advanced far enough that we can
handle all sorts of different distributions of questions.

</turn>


<turn speaker="Matt Gardner" timestamp="07:55">

Yeah. And the other thing you mentioned about templated questions, yes, we definitely see that a
lot. I've collected lots of different datasets and getting people to not just give you the same
templates is hard and does I guess asking questions. If you say you want to know the answer, then
probably yes. You're not going to ask the same question over and over again with like small
differences. But there, I guess there are other ways to do it too, but that one does sound like it
would probably work. Yes.

</turn>


<turn speaker="Jon Clark" timestamp="08:22">

I think that helped a lot and the prompts also helped. If I just ask you right now, ask me 10
questions. You will almost certainly draw a blank, but if I give you some stimulus like you would
see walking down the street, Oh, I wonder how tall that sort of tree will grow. I wonder what the
name of that dog breed is. These natural things that you encounter in life. We're hoping to kind of
model as these prompts.

</turn>


<turn speaker="Matt Gardner" timestamp="08:46">

Great. Do you know what kind of questions this elicited,

</turn>


<turn speaker="Jon Clark" timestamp="08:50">

This elicited all types of questions. So first off we're definitely going information seeking
questions which are kind of inherently different than the reading comprehension setting. So for us
the questions come first rather than the passage coming first. One thing that comes up is there are
a fair number of factoid questions in the data to the degree that those are the sorts of questions
that our people were interested in knowing about. But I'd also like to mention one other thing that
only really soaked in for me once we were pretty deep in this project. And that's that it's not
necessarily that some questions are hard and other questions are easy. For example, factoid
questions, let's say, or that some answer types are harder. It's the some answer contexts are harder
to match to questions than others. So certain categories of questions may tend to naturally require
these sorts of complex mappings between the question and the answer.

</turn>


<turn speaker="Jon Clark" timestamp="09:45">

But it's this more subtle relationship between the question and the answer that really makes
information seeking questions. Interesting. So when I look at examples of SQuAD and TyDi QA, I tend
to see a lot of exact or near word matches in SQuAD, sometimes with paraphrasing, but usually not
much more than that. But in TyDi QA the matching goes beyond simple paraphrases. And I think this is
one of the key advantages of information seeking questions that the task remains challenging in a
good way, even for seemingly straightforward questions.

</turn>


<turn speaker="Matt Gardner" timestamp="10:19">

Great. Do you have some examples of the kind of mismatch that you're thinking of here?

</turn>


<turn speaker="Jon Clark" timestamp="10:25">

So one of the examples I like to cite is kind of figure one from the SQuAD paper. I believe this one
is about precipitation. They're listing off the types of rain and sleet and hail and other such
things. And if you look at the question that's asked from this paragraph, it copy paste perhaps four
or five different words from the paragraph and nestled neatly amongst those exact matches is the
answer grapple? Is this other type of precipitation that the question asker is interested in TyDI QA
our relationships between the question and the answer are more subtle. So there's this question
where somebody asks in TyDi QA, we see questions that are a bit more subtle. So one of our
annotators asks, "what ship did Han solo pilot?" And the answer does have one exact match, which is
"Han solo" but this is maybe like halfway through the answer passage. The other matches are all not
exact. So ship is not ship it Starship and pilot is not pilot it's instead commanded. So there are
more paraphrases there. And then the actual answer, the millennium Falcon isn't even in the same
sentence as most of these matches, it's a sentence away. So there is a lot more indirect matching
that needs to be done to properly answer these questions.

</turn>


<turn speaker="Matt Gardner" timestamp="11:56">

Can you read that paragraph or at least the relevant sentences?

</turn>


<turn speaker="Jon Clark" timestamp="11:59">

So the answer paragraph is "The Millennium Falcon is a fictional Starship in the Star Wars
franchise. The modified YT 1300 Karelian light Frater is primarily commanded by Kirlian smuggler,
Han solo; Harrison Ford" and it goes on.

</turn>


<turn speaker="Matt Gardner" timestamp="12:17">

Interesting. Yeah, that's really cool. When I, when I think of these data sets I'd like to think of
like what kind of phenomena do you need to answer the question? Do you need to understand in order
to answer the questions here and from what you just read and the question that you gave, it looks
like to me to answer that question, what you need is an understanding of co-ref and that's a pretty
hard co-reference problem. Perhaps this Millennium Falcon to the modified Y wing or whatever the
phrase was. And then you need to know the predicate argument structure of the Y wing and that that
local structure there that was primarily commanded by is a match for whatever the question was like
what ship did Han solo fly something like this or what was he the pilot of? You have to know that
these two argument structures are corresponding and so then you can pull out the modified thing and
then you have to like use co-reference to go back to the name to get the Millennium Falcon.

</turn>


<turn speaker="Jon Clark" timestamp="13:08">

Absolutely, and by the way, this is just in the English case, like this is our baseline and then
once you add multi-lingual on top of this with morphology and diacritics and other issues, frankly
that's where I think things become interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="13:24">

Yeah, yeah, definitely. How are predicates argument structures realized and how is co-reference
handled in various languages? These are very, very interesting questions. I agree. I guess a
counterpoint to what I just said is that maybe, actually to get this question right, you just have
to find Han Solo and find something that looks like the name of a ship and maybe my pre-trained
embeddings already know this and so what would you say to this kind of response that are these
questions really as hard as they look or are there cheap tricks to get the answers right?

</turn>


<turn speaker="Jon Clark" timestamp="13:51">

I think inevitably there are some cheap tricks that will help you solve many of these things, but in
general, I think that when you're looking over big passages like this, when you have to look over
entire Wikipedia articles, you're going to find that there's a lot more distractors hidden in there.
And that's why it's important not just to look at the passage, but to have to reason over entire
articles because this is what real people want. I think if you have a real information need, I don't
want to give you a single passage and ask you to bold face the answer for me. I could have read that
myself quite easily. I want you to do the hard job of reading over all these articles on my behalf.

</turn>


<turn speaker="Matt Gardner" timestamp="14:33">

Yeah, I think that's totally fair. That's how I think about things too. I focus more on the reading
comprehension side where it's like I want to like given a paragraph, see if the machine actually
understands the paragraph in some way, but I agree that this is totally artificial, that if as a
person, I have the paragraph in front of me, I'm not going to ask a machine, answer the question.
I'm just going to read the paragraph and get the answer myself and so like it's trying. I like the
way you phrased this in your paper. I think Jordan Boyd-Graber also has talked about this, like
there's a difference between like information seeking versus validation and the reading
comprehension setting, at least as I, as I think about it, is more about, let me validate the
understanding of some system. Whereas what you're targeting here is let me solve a human information
need, which is definitely useful and interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="15:18">

I do think it's interesting though to think about when you have these human information needs, what
kind of things do you need to do in order to actually fill the human information need? And maybe
this is just because of whatever artifacts of the data collection process that you had. It does seem
like the kinds of phenomena you need to understand are pretty similar, though harder than what you
would see in SQuAD-1 in SQuAD-2. But the way I just for I think about this a lot, maybe I don't
explain it enough. The way I think about this is that SQuAD is basically predicate argument
structure. I need to find a paraphrase of a question in the paragraph and maybe maybe there isn't a
paraphrase. That's SQuAD-2. We need to figure out when there's no paraphrase and then given this
paraphrase, I need to extract some argument from the paraphrased part and maybe that paraphrase is
very hard. Maybe it's hard to realize that it's not there that you can make this problem hard, but
it's still essentially a predicate argument structure matching and extraction problem. And I believe
from what I've seen in the paper and from what you're saying here that TyDi QA is basically looking
at this same kind of problem. Do you think that's fair?

</turn>


<turn speaker="Jon Clark" timestamp="16:24">

I think it's fair to say that's one category of problems you'll see in there. I think that because
we've collected this in an information seeking way, you kind of randomly get all sorts of different
examples because you don't know how the answer is going to relate to your question in advance, so I
think there's maybe some bias once you've looked at the paragraph to not be too harsh to this poor
person who has to go answer your question later and so you're looking for things like
straightforward paraphrases. You're looking for kind of a simple entity or argument that's going to
answer the question, but very often in some of the hardest questions that we've seen in TyDi QA and
also the natural questions, there is no straightforward answer. One of the examples I remember from
one of our training tasks back when we were still piloting is that there was this castle that was
built, I don't remember which one, but then it was destroyed by fire and then it was rebuilt and
then it was expanded a bit and so when someone asks when was this castle built? They don't know this
whole story behind it. And so there's also this notion of true ambiguity over different reasonable
answers. And so you have to build a model that knows what is the preferred answer, what would the
canonical most accepted thing be here.

</turn>


<turn speaker="Matt Gardner" timestamp="17:46">

Yeah, that's a really great point. One thing that I find hard about information like that with all
the caveats that I like this approach to pushing research and this is a really useful problem to be
looking at. One thing that I find difficult here is understanding what it takes to solve the
problem. When I construct a dataset that's targeted at a particular phenomenon like temporal
reasoning or co-reference resolution or whatever, I have a pretty firm understanding of if I can
model these phenomenon correctly, I should be doing pretty well on this data. Whereas if I just do a
blanket, hey users give me whatever and I'm going to pair stuff and just try to figure out how to
answer these questions. I don't really have a firm idea of how to make progress even and so like
this is why I keep asking these like can you categorize things like have you done this? Like let me
understand what's inside this thing.

</turn>


<turn speaker="Jon Clark" timestamp="18:38">

So I agree that we really do need a good understanding of what it takes to solve these datasets and
in some sense TyDi QA is aiming to do two things at the same time. We want to both be able to do the
science and to be able to help the real users and so we stuck to this distribution. That's
interesting questions. I think how we're going to need to proceed to really get farther into that is
to begin taking slices of the data to find within this information seeking context, those questions
that require paraphrase those questions that require co-reference for our various languages. We're
going to need the help of linguists, people that can gloss these examples and tell us this is an
example of infects morphology in Arabic. This is an example of there being 200 different verb forms
and Finish plus compounding, meaning that your model estimated this word piece very poorly. So I
think we're going to need to A. slice the data, but B. we're going to need actual experts to help us
do that and I'm hoping that these various subsections of the community, people who have been
formally trained in linguistics can kind of partner with us to help us solve those problems.

</turn>


<turn speaker="Matt Gardner" timestamp="19:51">

Yeah, great. I agree and I think in the end we're converging on basically the same thing because
when you say I'm going to slice the data, maybe you find that there isn't much, that there aren't
many examples of a particular slice and I might target some data collection to try to get more of
them and now you're taking basically exactly the same approach that I've been taking. It's just
starting from different places and ending up in the same place. I think we basically agree here.

</turn>


<turn speaker="Jon Clark" timestamp="20:13">

Indeed. I think there may always be some difference between the questions people want to answer and
the questions that we find interesting though. So I do like the idea of first having some evidence
that people would like an answer to this question before spending a lot of resources on finding out
how we can make machines do that. I think the flip side of this coin is of course maybe people
aren't asking yet because they don't trust our systems with this. They've tried a couple times and
it didn't go well and so they don't ask again. So we should expect there to be some distribution
shift in the future. Maybe it's because we're going to a different domain or because a different
topic is suddenly of interest to the whole world and in those cases we would want our systems to
already be prepared for things we haven't seen yet. And I think that's where preemptively looking at
these slices would really come in handy.

</turn>


<turn speaker="Matt Gardner" timestamp="21:09">

I guess fundamentally though, there's still gonna be a difference between information seeking and
validation kinds of questions. Like there will be things that you would want to validate that you
would never ask in an information seeking way. And so depending on, it just really depends on what's
your ultimate goal here.

</turn>


<turn speaker="Jon Clark" timestamp="21:24">

Absolutely.

</turn>


<turn speaker="Matt Gardner" timestamp="21:25">

And both are good goals.

</turn>


<turn speaker="Waleed Ammar" timestamp="21:27">

So while we talk about how the data's collected. Could you comment on the differences in the
collection strategy between TyDi QA and natural questions?

</turn>


<turn speaker="Jon Clark" timestamp="21:36">

So they're very similar for answer labeling, we actually used exactly the same tool. The difference
is really in where the questions come from for natural questions. These were real user queries that
were heavily anonymized and that were common in the query stream. Among other constraints for TyDi
QA. We actually elicited these questions. We showed people prompts, we asked them to generate
questions that were interesting. And so this means the questions themselves look a bit different.
But when you actually compare the distribution of our questions, personally I was pleased to see
that these are basically questions that I think people would ask. I think that's really the main
difference.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:18">

So I guess the baseline I would expect is like to start from where national questions was
constructed. So what, why the division, what did he decide to do something different about the, the
question collection?

</turn>


<turn speaker="Jon Clark" timestamp="22:30">

Well, I wanted something that would be kind of an even baseline across languages. And one issue that
we know would be true is that again, users aren't necessarily going to keep trying things if they
don't see great results already. And so for some of these languages like Swahili, I doubt there
would be that many interesting and complex questions already there.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:55">

Yeah, I would say this is also true for Arabic. I know for example, my grandparents, my parents are
visiting these days and they find it really like surprising and like unimaginable to be asking
questions at Google.

</turn>


<turn speaker="Jon Clark" timestamp="23:09">

Yeah. So I really see this data set is hopefully kind of paving the way to create something new that
will then be able to help people later.

</turn>


<turn speaker="Matt Gardner" timestamp="23:18">

So you took, from a data collection perspective, you thought it was really important to start to do
the process end-to-end in each individual language by itself. Like not starting from English and
then translating. There have been another, there have been a number of recent efforts that went to
the other way where they started with SQuAD or other datasets and translated them. Why take the
approach that you took with TyDi QA?

</turn>


<turn speaker="Jon Clark" timestamp="23:42">

Yeah, so in many respects, using translation probably feels like the most natural way of getting a
multilingual dataset. We have interesting English datasets. We have human translators available. Why
not just pay them to translate into whatever language we're interested in. So first there's the
issue of priming. If human translators are looking at the question and the answer at the same time,
they're more likely to reuse. Not only the same words has we kind of saw in the SQuAD case, but the
same morpho syntactic forms in both the question and the answer. I've also seen examples where human
translators keep the English word order when translating into a language that is usually free word
order. If that happens, then our data wouldn't really reflect the full richness of these languages
and we could even kind of fool ourselves into thinking we're doing a good job of modeling these
languages when we're really not there yet. And by the way, both in the machine translation community
and even human translators are aware of this aspect of translated texts. They've named it
translation ease. It's so identifiable that people have even built high accuracy classifiers to
distinguish original language text versus translated text.

</turn>


<turn speaker="Matt Gardner" timestamp="24:55">

And your history, I remember we were PhD students together at CMU. You did a lot of work on machine
translation. So I assume your experience with all of this colored your motivations here.

</turn>


<turn speaker="Jon Clark" timestamp="25:06">

Absolutely. The other thing we've seen is that depending on translation direction, you kind of get
the concepts that are centered around the source culture. So if we start from English, many topics
in the dataset could be a product of western culture. The majority of Telugu speakers in India might
not be terribly interested in American football. On the other hand, cricket might not come up so
much in English. We even see this in our own data by the way. So like we had a Bengali speaker ask,
"what does sapodilla tastes like"? This fruit does not sound terribly familiar to you. I know I had
never heard of it before and that's probably because it grows way more commonly in India than the US
so we're actually getting these topics that are more of interest for the target language.

</turn>


<turn speaker="Matt Gardner" timestamp="25:56">

You mentioned a few examples of different phenomena. You gave an example of Arabic and dual and
plural. Do you have more examples of the kinds of difficulties that you would have in other
languages?

</turn>


<turn speaker="Jon Clark" timestamp="26:06">

Yeah, absolutely. So one of the examples that I always like to talk about is this Finish question
where somebody is asking "Who invented the seven day week?" and the answer in English is "The
Babylonians most likely invented the seven day week." In English. This is quite frankly a boring
question, but then if you start looking at what's going on in the actual Finish data that we
collected, there's these compounds. Different words are compounded in the question versus the
answer, key words that you would actually want your QA system to match. Not only are they compounded
they're inflicted in various different forms, the answer itself of Babylonia is inflected in the
elative case. This is something we're not really so familiar with in English to inflect named
entities. This is rather uncommon in Arabic we also have a lot of interesting examples. Script
switching, sometimes diacritics are added or dropped, which is kind of unexpected. Usually
diacritics in Arabic are reserved for very formal texts. But here we see that there are sometimes
used for clarification in the questions. So all sorts of interesting things come up and we believe
that many of these things would actually be an issue for our current state of the art models.

</turn>


<turn speaker="Matt Gardner" timestamp="27:24">

And so diacritics just for the listeners are things like accent marks, you might, that might be the
most familiar use for English listening folks like an accent mark in Spanish or French, we don't
really have them so much in English. Sometimes you see two dots over a vowel in like highfalutin
journalist text. We don't really use this very much in English.

</turn>


<turn speaker="Jon Clark" timestamp="27:43">

Absolutely. So these would kind of look like diacritics in Spanish or other languages in Arabic
they're usually indicating short vowels which are spoken but not written down in the text.

</turn>


<turn speaker="Matt Gardner" timestamp="27:55">

And so you mentioned this Finish example of compounding and so in the paper your example has like
day and week are in the same word in like the question and it's like seven and day are in the same
word in the answer or something like that's like the grouping is different. I was thinking about
certainly if you have a word level tokenization and you do like some kind of attention here, you're
going to have a hard time because there's just so much morphologically that's going on inside all of
these tokens. But if I do a word piece tokenization, does this solve the problem?

</turn>


<turn speaker="Jon Clark" timestamp="28:27">

That's a really great question. So we actually did run multi-lingual BERTs word piece around these
things and frankly the result is not pretty. You do not get neatly segmented bits where you have the
stem in one word piece and bits of morphology in another word piece. You say, fine, who cares if the
word pieces really reflect what's going on in linguistics? But it's a bit worse than that still
because the word pieces between the question and the answer look very different. You don't get kind
of the same boundaries, you're not going to get exact match. So now you're putting all the pressure
on your neural model to hopefully map these things into a similar space. Maybe you get lucky on that
or maybe if this is a rare concept or rare entity, your word pieces are not well estimated and
things go poorly for you.

</turn>


<turn speaker="Matt Gardner" timestamp="29:17">

Yeah, it's really interesting to think about this like the whole field has converged on BERT or
Roberta or various transformers for like the last two years. This has been like almost everything
uses these things and we don't often stop to think about what the basic basic, fundamental
assumptions about this model, what implications that has on like our ability to model stuff. We had
a paper recently on modeling numbers like can you regress from the string like 1,223 can you take
that string value and regressed to its numerical value and it turns out that using word pieces hurts
you here quite a bit. Whereas like a character level, cnn will let you do this almost with like
randomly initialized weights you can do this regression, but a word piece tokenization makes it very
hard to do this. And this is just one example, even in English where this is a problem, but like
when you go to other languages that have much more rich morphology, like we really need to rethink
this. It's kind of not such a good thing that we have this like monoculture on just using BERT or
like these transformers that have particular underlying assumptions that just don't hold up.

</turn>


<turn speaker="Jon Clark" timestamp="30:23">

By the way, I think there is another path here and it remains to be seen how things will actually
go, but you could manually engineer decompounders, morphological analyzers, things like this, and I
think that's an interesting way to go. You could easily cover maybe the top 10 languages, maybe the
top hundred languages with quite a lot of effort in this way. But I think if our goal is really to
get to hundreds or even thousands of languages covered, I think we'll need some sort of modeling
approach that relies less on the supervised information sources and relies more on unsupervised
methods to just figure out the structure of these languages. Otherwise we're going to have a hard
time finding our expert who knows machine learning and computer science and Khmer and specifically
how Khmer is used in a social media context. So these manually engineered systems I think may get us
some short term gains, but personally I would love to see more general methods that will get us
farther down the tail quicker.

</turn>


<turn speaker="Matt Gardner" timestamp="31:26">

Yeah, I know that there's been a lot of work over the years at Johns Hopkins on unsupervised
morphological analysis. Like Jason Eisner and others have done a lot on this. I even had a
conversation with a student that's still pushing on this, which is really good. And yeah, like you,
that work has been kind of on the sidelines. But when you think about the this TyDi QA and like what
you actually need. If we really want to focus on these other languages, like as you say, we really
need this kind of work.

</turn>


<turn speaker="Jon Clark" timestamp="31:53">

I think we do. And I would encourage everybody not to think of these as individual languages that we
want to get good at, but to think of these languages as representatives of entire families of
languages. So don't just solve this for the one language. Let's, really try to solve this thing in
the general case.

</turn>


<turn speaker="Matt Gardner" timestamp="32:11">

Yeah. Great. So I guess on that note, how well do models actually solve this today?

</turn>


<turn speaker="Jon Clark" timestamp="32:16">

So in terms of absolute performance, the short answer is not very well. If you were to show the
output to real humans, I doubt they would be very impressed. The good news for us researchers is we
have lots of headroom somewhere in the neighborhood of about 15 to 20 points F1 on both our passage
answer task and on this minimal answer task. And so that's kind of the space between a multilingual
BERT baseline and our current estimate of human performance. Maybe one quick note to make there is
that we know our estimate of human performance is too low. So the natural questions was able to
demonstrate that a 20 way human super annotator. So essentially you're ensembling humans to help
make your answer and then you evaluate that answer against five human annotators, your gold dev set.
So that super annotator set up performs about 18 F1 better than a single human annotator guessing
against those five gold references.

</turn>


<turn speaker="Jon Clark" timestamp="33:19">

So this is all to say that since TyDi QA only uses a single annotator to estimate our human
performance, I'd actually expect there's around another 10 or 20 F1 points of headroom even above
our current human estimate. But I think we can cross that bridge when our models come to it. For now
we have plenty to keep us busy.

</turn>


<turn speaker="Matt Gardner" timestamp="33:38">

And what about across languages? Do models do better on English than other languages? I assume
that's true.

</turn>


<turn speaker="Jon Clark" timestamp="33:44">

So to be honest, I think we can't answer that question yet. So among the languages, the questions
are different. The articles are very different. English has much longer articles than other
languages. The answer content is often just not there in other languages, so maybe it's easier to
reason across shorter articles. Maybe we have more pre-training data in English than others, which
is perhaps fair. Perhaps it's just easy to guess null there's no answer because often there's not in
some of these languages, so unfortunately I think 50 F1 means something different in each language.

</turn>


<turn speaker="Matt Gardner" timestamp="34:25">

And you said, so you put up a leaderboard for the test set and you said you did some interesting
things there that you wanted to tell us about. Can you say what those were?

</turn>


<turn speaker="Jon Clark" timestamp="34:34">

Yeah, so I think it's safe to say that there's been a lot of discussion about the role of leader
boards in our community, especially around whether they're incentivizing people to blindly chase
state-of-the-art numbers. Personally, I think of the numbers on leaderboards, like little existence
proofs there exists some model architecture and some training regime that will result in this number
on the test set. We're hoping that leaderboards can give us a bit more than that though. We're
hoping they can also tell us more about the how and the why behind these systems, which is important
if these leaderboard entries are going to help us with progressing science.

</turn>


<turn speaker="Jon Clark" timestamp="35:10">

So with this in mind, we're asking folks to answer five questions along with their system
submission. So maybe I can just kind of read those. "Is there a research paper describing your
system?" "Is the source code available?" "Is the system trained on any additional public data?"
Hopefully the answer to those three is, yes, "Give us a URL so that other people can better
understand the meaning of this number on the leaderboard." And then two more, "Is the system on any
additional private data?" and "Is the system trained using any public APIs or private tools?" So
hopefully the answer is no there because this means this thing is inherently kind of hard to
reproduce. And maybe the biggest thing to point out about this is that a lot of folks are likely to
be interested in using public translation APIs.

</turn>


<turn speaker="Jon Clark" timestamp="35:59">

So if you do that probably gets you quite far on the task. And that's interesting as an existence
proof. But by the same token, the output of the API may change next month. And also, I don't know
how much parallel data any one of these MT systems was trained on. So if you happen to have a
billion sentences of Swahili, and I think you're training on a million sentences in Swahili, this
means I can't really reason about how my system's performance would generalize to Amharic or some
other language that isn't included in this set. So we ask these questions not as hard constraints so
that we can still get the existence proofs, but to kind of also encourage good behavior and you
know, note what it takes to do a correct apples to apples comparison with these numbers.

</turn>


<turn speaker="Matt Gardner" timestamp="36:51">

I noticed you didn't have anything in there about computational resources.

</turn>


<turn speaker="Jon Clark" timestamp="36:55">

We don't have anything in there about computational resources. I would hope people put these in
their research papers. I think very often in the short term you can win big by using big
computational resources, but in the longterm people become more and more mindful of these costs. As
you kind of figure out that we've banked the gains, but now we would like to reduce costs. People
become increasingly interested in very efficient methods and I hope that'll just naturally come
about as part of our iteration in the community.

</turn>


<turn speaker="Matt Gardner" timestamp="37:29">

Great. That I think is all the questions that I had. Is there anything you wanted to talk about that
we didn't cover or any final thoughts before we conclude?

</turn>


<turn speaker="Jon Clark" timestamp="37:37">

I guess I would just say a big thanks to the whole team that made this happen. We were lucky to have
authors of several previous datasets including the natural questions and QuAC. We had linguists who
are native speakers of Finnish and Russian. That was a huge help. We had folks that cared deeply
about multi-lingual modeling and I also want to say a big thanks to everyone who takes up this
dataset and your own research. We're really excited to see where you take this.

</turn>


<turn speaker="Matt Gardner" timestamp="37:59">

Yeah, and I will add my final thought, which is I think this is great. I think thinking about all of
the different linguistic phenomena that happened in language and like how different languages
express things differently and how we need to be sure that our architecture assumptions are actually
generalizable across languages. All of these things are excellent things to think about and it looks
like you did a really great job in putting together a dataset that should be really useful for the
community for a long time. So thanks.

</turn>


<turn speaker="Jon Clark" timestamp="38:24">

Yeah, thanks for having me on. I really enjoyed it.

</turn>


<turn speaker="Matt Gardner" timestamp="38:26">

Thanks. Thanks for coming on. It was nice talking to you. This is really interesting.

</turn>
