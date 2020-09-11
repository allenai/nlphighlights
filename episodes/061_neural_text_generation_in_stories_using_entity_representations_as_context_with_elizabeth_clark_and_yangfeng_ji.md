---
title: "Neural Text Generation in Stories Using Entity Representations as Context, with Elizabeth Clark and Yangfeng Ji"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["New Speaker","Yangfeng Ji","Elizabeth Clark"]
number: "061"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:12">

Great. Today our guests are Elizabeth Clark who is a PhD student at the University of Washington
working on natural language generation and is a member of the sounding board, the UW team that
recently won the Amazon Alexa prize. And also we have in the room Yangfeng Ji, who is currently a
postdoc at university of Washington and will soon be joining the university of Virginia as an
assistant professor. So congratulations.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="00:39">

Thank you.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:39">

Yeah, the paper we're discussing, we're discussing today is titledNeural Text Generation in Stories
Using Entity Representations as Context by Elizabeth Clark, Yangfeng Ji and Noah A. Smith. It won be
outstanding paper award at NAACL 2018 an honor only given to four papers this year. So welcome to
the podcast. What's the main motivation for this work?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="01:02">

So I've been working on story generation and collaborative story writing where you have a setup that
involves a person sitting down and writing a story with the help of a computer. So specifically at
every other sentence, the computer generates a suggestion for the next part of the story. So we've
had people come in and actually write with these systems and give us feedback on what they think
about the text that the models are generating to help them as they write. And one thing that people
said is that they really liked writing in this setup with help from, from the model, but that they
really needed the models to improve before they would actually consider using this in any sort of
writing tasks. And so we found that one of the main things they talked about was coherence the fact
that they felt that the suggestions that the model was generating, they didn't make sense with the
broader context of the story.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="02:01">

And one common piece of that was the fact that they didn't refer back to any of the entities or
characters that had already been discussed in the story. So one person said I wish that It'd paid
more attention to my character names and that degenerated sentences would also reference these
characters once I introduced them into the story. And when later on in the story it starts
introducing all of these random character names. It really breaks with what the writer's trying to
do if they're trying to just wrap up the story or conclude to just all of a sudden start introducing
new characters. So Yangfeng had recently worked on a paper that had looked at keeping track of
entities for doing things like language modeling and co-reference resolution. And so it seemed like
a perfect solution to try and put that into two a story generations. It's done to try and address
that issue.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:53">

That's very interesting. How does the system work with the users? How does it interact with the
users?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="03:00">

So the sound that we have right now is turn-taking. So we just have a website and we begin with sort
of visual prompts and we ask the person to write the first line of the story and then the computer
suggests the second line of the story. And then they can edit that as much as they want before they
go on and write another sentence by themselves and so on and so forth. And so there's a lot of
questions that are about how do you actually set up that collaboration. And then also on the
modeling side, how do you build models that will make suggestions better that are useful to the
person.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:31">

So are you viewing this mostly as an aid to creativity? Like what's the user story for writers here?
Why is this useful? I guess some context. I like listening to a podcast called writing excuses,
that's a bunch of authors talking about how they write. And I'm just thinking about how would these
people actually use such a system. I'm just curious what your thought is.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="03:50">

Yeah, that's a great question. So when we did this user study, the people that came in to write with
the system varied. So some of them were professional writers or hobbyists writers that wrote a lot.
And then we had people with little to no writing experience. And one of the interesting things is
the type of support, as you might imagine differs depending on your experience with writing. So
people who are more experienced writers, they were interested in things like preventing writer's
block, maybe like coming up with new ideas if they get stuck or ideas that they might not have
considered. They, they wanted more on demand help. Like if you will, like they want us to write on
their own. And then when it was, whenever they were feeling stuck, they could go and seek help.
Whereas more novice writers who maybe weren't that experienced and were pretty intimidated by an
open ended creative writing task, having more structure, more regular support in that setting that
was more important to them. So it depends, I guess you can, you could see it being sort of an
educational tool for people learning how to write. You could see it being a tool for professional
authors. And the way that you build those interactions and again, even on the modeling side might
look very different for those two different audiences.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:08">

Yeah, that's really interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:10">

So how does the model generate words, that's the main model the proposal from the paper or something
that allows you to represent entities and generate the next words in the narrative. So how does the
model work?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="05:24">

So the model that we proposed in this paper builds off a seek to seek baseline, which is what we had
used in previous writing tasks. And so the, the context that that uses is the context of the
sentence that's currently being generated. So of the sentence that you've generated so far, what are
the words we've already output? It also uses the previous line of the story. So it gets a
representation of that and it uses that context as well. And the third piece of it is now what about
the entities in the story? Can we keep track of those in use information by what's happened to all
of those entities? What we've seen so far as an additional source of context as we generate the next
sentence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:04">

So I guess let's zoom into the entity's component here. Cause I think that's the most interesting
part. How does it work? You mentioned we're using some of the earlier predicting text entity, that's
the components and how it works.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="06:21">

Sure. So I guess I can get the high level review and try to give a little bit more detail. But the
basic idea is that as you go through out a text, every time you encountered an entity, there's a
vector that's created to represent that entity. And each time it's mentioned that vector
representation is updated. So when it comes time to generate the word, the next word of the story,
do you have access to as a collection of vectors, one for each entity that represents kind of the
current state of that entity in the narrative so far. And so when it comes time to generate the next
work, the model makes a couple of decisions. It decides first should the next word refer to the
entity, if so, which entity should it refer to? How many words should be mentioned, things like that
and based on that decision. So if it decides the next word should refer to entity A, then it takes
entity A's representation of the current time and uses that as another form of context as it
generates.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:20">

So is this a hard decision at every time step? So just thinking of like end to end learning about PR
backpropagation through hard decisions. Doing an argmax is not differentiable so are you, are you
actually making a hard decision about what, which entity is represented? And then if so, how do you
actually train this thing?

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="07:41">

So it is a hard decisions, and in this work we actually acquired the trained data to have the cor-
reference information annotated. So to me is we have that part of the information and we don't need
to decode a softmax because we don't have the ground truth. And we use the ground truth to guide the
softmax to do a right decision about which entity we should use or if we should create a new entity.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:08">

I see. So I guess you say you have the vector represent each entity and you select the entity and
use that vector. Another very common thing to do would be to, for instance, have an attention over
entities and to a weighted sum of the entity vectors and use that instead. Right. and then you don't
have to have labels for like which entity is actually being referred to you. So you could train this
on more data. I assume you tried this at some point, did you, and if so, what happened?

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="08:38">

So what you described is very similar to the part in the work that is trying to keep track of the
entity What we do here is we want each entity representation to have a specific meaning about what
happened to one particular entity in the text. So that's why we have this area instead of doing a
soft version like user attention to take weighted sum. I guess the big difference is in the model
you described there will be a flexibility as the model will have a big potential because you have
like a, you have a weighted sum and that will increase the potential of the model. But in our case,
we are particularly interested in, for example, text generation, we want entity representation to
encode. Each individual entity information instead of just mixing them all together.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:31">

So I guess the difference here is that you're relying a little too much on the co ref model, but
other than the state that the cor ref model is going to be doing, we don't really need any more
additional annotation. It's the same training data.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:46">

Okay. Yeah, you're right. You can just use the systems output. That makes more sense. Okay. Yup.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:53">

I guess that begs the question of how good is the co-ref?

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="09:56">

Oh yeah, that's a, that's a reasonable question.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="09:59">

Not perfect. Definitely not perfect. So one thing that we've found in the data. So we got these
automatic annotations and we saw that some of the entity mentions were I think over 70 words long or
something like that. And we assumed that was an error. So we ended up filtering it so we were only
considering entity mentions that had at most three words in front of that was because we were
interested in mainly character, characters were a very motivating part of this. So we filtered those
out but it's not perfect. So as we improve co-ref systems, we expect this model to preform betters
as well.

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="10:32">

Yeah. Another thing from the co-reference resolution result, what we find is it has a relativly high
precision than recall, which means most of the time if we find there is a co-reference link it is
correct. But there is another big trying to just miss the co-reference link, which is also, it's
like it's okay to use this. I mean since the precision is not bad that precision is fine.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:00">

So there are different components in this model, there is the part that captures the context from
three different sources of information; previous sentence, the current sentence, and the previous
entities, and there's the part that predicts what we're going to do whether we're going to be
creating entities or not and which entity. And then there's the part that generates text, whether
this is an entity or not and each of these components have parameters. Right. How do you, so you
mentioned how you train, how you fit the model for the entities that to make the entities decisions.
How about the other components? Are they trained independently?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="11:36">

So when the model makes a prediction, it predates all of the information that once, so it predict
that it predicts whether what the word is, but it also generates all of these, the entity
information as well, whether it refers which entity refers to how many words are in it, et cetera.
Yeah. So it's making all of those predictions at once.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:57">

So it's the same training set and used to optimize all the parameters of the model together.

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="12:02">

Yeah, untrained and trained.

</Turn>


<Turn speaker="New Speaker" timestamp="12:05">

I see.

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="12:05">

All the information can be used predict the word, once the word is predicts. We can use this to
discern to optimize other parameters.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:14">

That makes sense. And then have you update the entity embeddings. So you mentioned that you maintain
one embedded for each entity throughout, but it's updated. And how does it that update happen?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="12:23">

That updating is a combination of the previous representation of the embedding and the hiddent
state, those are combined to update the entity representation,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:33">

So they had a state for that from the LSTM representing the co-reference.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="12:37">

Right.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:39">

So it's a way to, a combination, it's a function of both these two entities make.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:45">

So I think to recap that and as I understand the model, let me see if I have this right. You have a
seek to seek model with attention. That's just given the previous sentence, generate the next
sentence. That's how you're doing that. You could also think of this as like a conditional language
model that's conditioned on the previous sentence. But I guess with attention, so just a seek to
seek model with attention there to generate the sentence. And then you also have this entity, neural
language model from prior work that tries to keep track of what entities are present and use those
to generate words. And then you're mixing these two somehow. And that's your language generation
model. Is that a fair characterization of what's going on?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="13:31">

Great. So we take each of the context vectors if you will, from each of these pieces and we combined
them together into a single context vector, which we use to generate the next word.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:43">

And how do you, how do you combine them into a single context vector?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="13:47">

So in this work we use just mass pooling to combine all the vectors together we didn't want to
introduce any new parameters. And max pooling worked best out of a few different things that we
tried. But you could think about other ways of taking these forms in context and combining them
together.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:05">

I guess both of them will generate a distribution over words that every time step you could imagine
just mixing these two probabilities. Is that, does that make sense? Is it something you tried? Does
the question even make sense? So the seek to seek model with attention is essentially a language
model. It'll give you a distribution over words at every time step. So will the entity neural
language model, right. And then you could imagine just like ensembling these two are mixing the
probabilities instead of incorporating them with this max pooling operation in the middle. I'm just
curious like is there anything interesting to say there about if it's better to combine them earlier
and let them model do something interesting or would you really get basically the same thing if you
ensemble them at the end? I don't know.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="14:52">

I think one of the possible side effects of making this decision later is that for the component
that just tries to predict the entities, it will tend to default as well be using the entities all
the time because many of the talkings are not. But I guess that actually the central thesis of this
paper is that you need the entity information most of the time while you're generating a narrative
text. So I take that back.

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="15:22">

Oh, the entity, the entity representation has been used every single step to predict the word. It is
used to predict into dimension also used to predict the word after this incident?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:36">

Yeah. Potentially it could also work for both. Cool. So how about the experiments? How do you, how
did you experiment with this model? What tasks did you try?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="15:48">

So we had three different evaluations of the model. The first we really tried to look at the entity
dimensions themselves, make sure that we can generate mentions to entities in appropriate way. The
second one moved out from just entity mentions and looked at text overall. And then the third was a
human evaluation because that was one of, one of the central motivating factors of this is how can
we generate texts to help people write stories or to generate stories that, that people want to
read. So how, we wanted to make sure that we wanted to see what people actually look for and
appreciate in generating texts. So the first that was, I mentioned generation tests and the way that
this worked is we took stories. So, so the corpus we are using for all of this is the Toronto Book
Corpus.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="16:35">

So we're training and testing it on adventure books specifically. And we took these passages from
the book and we removed each of the entity mentions from them and we had the models go through and
fill in the blanks, if you will, where they were choosing entity mentions from a candidate list
where the candidate list consisted of every entity that had been mentioned in the story so far. So
in the very beginning, the very first blank set it needs to fill in. There's only one candidate and
that's the gold candidate. But then for the next step there will be two candidates, the gold and the
previous entity mentioned and so on and so forth until at the end of the passage you can have over a
hundred candidates in one list.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:20">

So it's really unfair to predict signal to predict the first, the first mentioned correctly. Right.
I, it makes sense to predict that there is a new entity, but the name of the new entity is pretty
much unknown. Right. That's how is that part of the evaluation?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="17:38">

So for this specific evaluation, the first one is actually trivial because there's only, there's
only one candidate to choose from. So in that sense it is simpler. But yeah, if you were looking at
this specific task and asking it to specifically generate some specific names, that might be
difficult.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:57">

But you also, you're going read this, the surface forums row of the actual strings that were
generated. Not just that there is a new cluster.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="18:06">

Right. That's a good point. So we did, we had three different versions of this. One was just
generating clusters. One was generating the, the text itself. And one was both. Yeah. Making sure it
was predicting the right cluster and the right string the right mentions and back to the right
clusters.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:26">

And which one do you, would you consider to be like the most reliable or the most useful one in
rating such a model?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="18:33">

So predicting both the cluster and mention of that is the most difficult and the most important. We
expected to be able to not only know what words to predict or to generate, but also to know what
those words are referring back to which entities in the story.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:49">

So how did the model fair on these tasks?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="18:52">

So the model that used both the representation of the previous sentence and the entity information
was strongest across all of these three versions of the test and the entity model also performed
well, which we would expect. So because that's the other baseline that we consider that uses the
entity information. So those two were best at this entity related task, which is what we,

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:18">

Is this a language model? Would you call it a language model?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="19:23">

So it's getting a distribution of the vocabulary and generating it from that.

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="19:31">

You can use it as a language model, but it requires the co-reference information analyst dealing
with the training.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:39">

Right. But, but at test time you could evaluate it as a language model. Like, why, why not include
perplexity just straight perplexity as a fourth option in this evaluation setting,

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="19:49">

The motivation of this experiment we are simply trying to test the model particularly on the entity
mentioned generation task and this is what like one sub task in text generation we actually
inspirited by prior work people are working on like the referral expression generation. But we
propose this test is slightly different from the, from the refrain expression division. The idea
which is a similar is like okay, now you have got, you have mentioned you want to generate and then
okay and what are we trying to test is if the model can teach the red enter different entity and
also as mentioned in this case it is not, in language model your value is like the whole text
including estimation and all the other tasks. In this case we just like a particular component in a
sentence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="20:45">

I guess going back to your original motivation, what you were, the end goal for this is to use this
system. Just take the output text and show it to authors. And in that case you're just generating
text and perplexity doesn't seem like a totally useful metric there, but at least it is like you
just have text. And so in that sense using perplexities seems like a reasonable evaluation metric or
at least one of the best ones we have for better or worse for this kind of system. Right.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="21:15">

Sure. Yeah. So I think, so the first two evaluations were sort of intermediate ones looking at the
usefulness of the entity information specifically. I guess that in terms of zooming out to the text
overall, that's the human evaluation that we did where we didn't include any of this entity
information and just looked at the text itself.

</Turn>


<Turn speaker="Yangfeng Ji" timestamp="21:34">

I think the second experiment where we select the sentence is sort of like the language modeling
tasks where we can compute the scroll of the next sentence based on context.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:47">

It's a variant, buy yeah, measuring for perplexity is much harder there's a lot higher expectations
of the long will just to take between as few examples but it's like an unlimited number of options.
Yeah. But I, I think I disagree with you here, I think perplexity is the best we can do if we have
no clue what the language model is going to be used for. But if we know that we will want to use it
for machine translation, then we should use it. You should use a more meaningful metric like BLEU in
order to evaluate how good this language model is working for that task. And I think here, given
they know what they want to use this for, I think it makes sense to actually focus on the more
extrinsic and say tests that focus on this use case.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:38">

Yeah, I agree. That's a really good point. And Elizabeth's answer pointing to the human evaluation
was I think, a great answer to my question. I agree.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:45">

So I guess that takes us to the next question, can you talk a little more about the human
evaluation?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="22:50">

Sure. Yeah. So in this evaluation we took a story passages again and we had two models generate the
next line of the passage. So we had the full model using the entity information and the
representation of the previous sentence. And then we had our seek to seek baseline that just, that
didn't have access to this entity information. So we had both of these models generate the next
sentence and we gave these two triggers and we had them choose which of these two sentences they
thought best continued the story. And we didn't say anything about entities. We didn't really give
them any more details, pointing them to the fact to characters or anything like that. It was just,
chose one of these two sentences to continue the story. And then we just had a text box at the
bottom for them to explain why they made the decision that they did.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="23:40">

And one of the things we wanted to get out of this evaluation was getting a better sense from what
people actually pay attention to when they evaluate narrative text or story text that's been
generated, what do they focus on? What makes or brakes these types of generated sentences for them?
And so one thing that we saw was that when we, when we had the full model and we did generate code
reference information correctly or words refer nicely back to characters that existed in the story
people didn't mention it, but like that was never a reason why they chose the sentence that Oh, the
co-ref was perfect. I loved the sentence so much more than the baseline, but they did mention it
when it went wrong. So for example, there was one story where, where the seek to seek baseline had
generated a sentence that had the word she and there were no female characters in the context.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="24:33">

And more people chose the full model sentence and said things like, Oh, there was a she in the other
sentence that I, that didn't seem to fit with what had happened, but co ref was not the most
character related information like that was not the only thing that people mentioned when they gave
explanations and the range of things that people cited as reasons for choosing the sentences that
they did or for liking certain sentences over others. There was a lot of variety there. So people
mentioned things like, Oh I thought this sentence better matched the tone or the theme of the story.
Or there were all these like common sense situations, things where they didn't think things that
were generated fit with the social scenario or were out of character for certain people or things
like that that our model is not explicitly representing. So yeah, there's still a lot to do about
this. Hopefully helps with one, one piece of it, but people are expecting different things. Some of
them said like, Oh, I thought there would be more directions to take the story and based on this
sentence versus another. So there are a lot of open questions still in narrative text generation.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:52">

So I guess that leads to many more papers on this direction.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="25:55">

There is a lot to explore here.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:58">

Are you going to write your next five papers based on their suggestions.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="26:03">

One for each of that pieces of feedback that we got. Exactly.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:07">

And maybe could you just quickly tell us about the results for the second for the second task?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="26:13">

Oh, sure. So the second task was given a passage in two sentences. One sentence is the next sentence
in the passage and the second sentence is a distractor sentence that comes from the same story but
is from up to 50 sentences away from the gold one. Can you decide which of these two sentences, the
gold or the distractors should continue the passage. And we found that the model that uses to
representation and the previous sentence representation significantly outperformed the other
baselines that correctly identifying which sentence should come next in the story.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:47">

I suppose this is primarily for, like, because of centering theory, because people to talk about the
same entity; is that your intuition of why this would work there?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="26:57">

So I think it's, it's both the entity information but also that that representation of the previous
sentence is helpful too because that the two baselines have one or the other and you need both in
order to do well with this test.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:11">

All right, so I guess that concludes the discussion of this paper, but more broadly it seems like
there is a lot more work on generation these days. I was a NAACL last month and I saw many papers
talking about generation test strings from traditional things like translation summarization, but
also generating adversarial training examples or newer tests like collaborative storytelling. So any
thoughts on what's driving the uptake in natural language generation?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="27:40">

Yeah, I think I mean we have models now that can take in a bunch of data and try to generate like
responses and dialogue or stories or things like that. But I think now that it's kind of the seek to
seek baseline is being tried out and you're seeing, Oh, there's still problems here. This didn't
just magically make all of those issues disappear. How can we go from sort of traditional methods?
Like for stories, for example, where, where things were often rule based or things like that to
these models where you have maybe tons of story data but you're not really utilizing any of it, in a
totally interesting way. How can we kind of combine these two together into a model that can
generate text that people actually like and enjoy? I think there's a lot of space there and people
are really starting to dig into that now. I think also the applications are just really exciting to
people, right? We have, we have these assistants and chatbots and kind of these side of things that
people get really excited about, but there's a lot to do to improve those still. And I'm excited
about the creativity space, like moving away from like how do we support people and tasks like story
writing or poetry or I think language is a really important way that we interact. So if we can
generate that the applications for it are really, really wide reaching.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:08">

I guess another thing that I've been thinking about a lot recently and colored the, I guess was
behind the language modeling questions I asked. We saw the ELMo paper at NAACL about using language
models to do better contextualized representations of words open AI recently published a very
similar paper with it, slightly different take on this. This is why I was thinking how do we get
better language models that actually capture discrete kinds of structure, like entities for
instance. And it seems like if you can get a good entity language model and have a good way to get
better contextualized word representations that are informed by this discrete notion of entities,
maybe you should just have a better ELMo. Right. Does that make sense? Any thoughts on that?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="29:56">

Yeah, I think that makes a lot of sense. And I guess it depends on the tasks where you want to use
ELMo for. If it's, especially if it's something that's like a narrative that I think that would make
a ton of sense. I think in other contexts, like, I dunno if we're generating scientific papers,
you'd want to have better representations of other constructs. Maybe not entities, but maybe like
section information or who the authors are and what the venue is about. But yeah, that makes a lot
of sense. That we try to squeeze in more information about the document or the kind of text that we
try to encode. All right. Any more thoughts on this paper or only on the area as a whole before we
conclude?

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="30:41">

No, just that we're, yeah. Excited to see what happens next. I think there's a lot of, as we saw in
that human evaluation, there are a lot of open questions there, and we are excited to see what comes
out of it next.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="30:53">

Awesome. Thank you very much for joining us.

</Turn>


<Turn speaker="Elizabeth Clark" timestamp="30:55">

Thanks for having us.

</Turn>
