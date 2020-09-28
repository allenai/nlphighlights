---
title: "A Joint Sequential and Relational Model for Frame-Semantic Parsing, with Bishan Yang"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Bishan Yang"]
number: "049"
tags: []
description: "EMNLP 2017 paper by Bishan Yang and Tom Mitchell. Bishan tells us about her experiments on frame-semantic parsing / semantic role labeling, which is trying to recover the predicate-argument structure from natural language sentences, as well as categorize those structures into a pre-defined event schema (in the case of frame-semantic parsing). Bishan had two interesting ideas here: (1) use a technique similar to model distillation to combine two different model structures (her \"sequential\" and \"relational\" models), and (2) use constraints on arguments across frames in the same sentence to get a more coherent global labeling of the sentence. We talk about these contributions, and also touch on \"open\" versus \"closed\" semantics, in both predicate-argument structure and information extraction. https://www.semanticscholar.org/paper/A-Joint-Sequential-and-Relational-Model-for-Frame-Yang-Mitchell/a1deb609e3758519cbe3f1a542bdf1ea52b6f224"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F394935255&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence. Today our guest is Bishan Yang. She is post doc fellow at Carnegie Mellon
University working with a professor, Tom Mitchell. She completed her PhD in the department of
computer science at Cornell University in August, 2015. The theme of her research has been
developing effective machine learning models for sematic structure extraction from natural language
texts. Today we will talk with Bishan about her EMNLP 2017 paper title, A Joint Sequential and
Relational Model for Frame-Semantic Parsing with Tom Mitchell. The paper proposes a new method for
frame semantic parsing, which combines modeling, token sequences, and directly modeling the relation
between predicates and arguments and uses knowledge distillation to integrate the two modeling
components. Could you explain what the task this paper is trying to do to address and what's the
motivation for doing this work?

</turn>


<turn speaker="Bishan Yang" timestamp="01:06">

Sure, yeah. Just let me maybe briefly describe the frame-semantic parsing task. So the task, the
goal is basically try to map the meaning of our natural language sentence to some sort of structure
representation, called semantic frames. For example, if the sentence is "Waleed bought Matt a
pizza." Then the sentence describes the buying events, which can be represented as a frame and
Waleed here as the buyer and Matt is the receiver, or recipient and the pizza here is the good that
is being bought. So we are trying to build a machine learning model that can automatically extract
semantic frames from sentences. And the semantic frames can capture things like events, properties
and relations. So it's not necessary that the predicate has to be a verb. It could also be a noun or
adjectives. So that's basically the task. And typically this task was being addressed using a
pipeline kind of approach where people will decompose the task into two stages,

</turn>


<turn speaker="Bishan Yang" timestamp="02:16">

The first stage is frame identification. So, in the paper, despite my introduction is actually three
stages. So you need to first identify the predicate, like which words in the sentence is actually a
predicate. In this paper we kind of skip the stage because in practice in this dataset people have
showed that there's not enough regularities for our machine learning model to pick up that. So I
just focused on the other two stages. So suppose the predicate or words are given in the sentence
you can identify as using a lexicon or things like that. And then the first stage would be
disambiguating which frame types, each predicate is evoking. So for example, the word, it's like a
word disambiguation task, right? So given the same word, it can trigger in different frames given
different contexts. And the second stage would be given the frame types that's already disambiguated
extracting the semantic roles that are associated with the frame types.

</turn>


<turn speaker="Bishan Yang" timestamp="03:27">

So in the introduction of the paper, there's an example where the sentence, we decided to treat the
patient with combination chemotherapy in a sentence are two predicates, "decided" and "treat," each
predicate is evoking different types of frames and given different frame types, there are different
text bands in the sentence that are filling different roles with respect to their frames. So
basically a structure prediction task where the structure can be fairly complex may not be tractable
in practice. So this is what makes the problem interesting. In this paper we try modeling the frame
types and semantic roles jointly. Also we are introducing this integrated model that combined
sequential and relational neural networks too. Predict this mentee Rose better may clarify something
about the task. So the predicate, can it be multiple words or is always one word, like a verb or an
[inaudible]. So in a sentence, there could be multiple words that are predicate. You can, each word
in a sentence can potentially be a predicate. The predicate is something that can evoke a semantic
frame that is defined in FrameNet. So in FrameNet there are about a thousand frame types.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:58">

And is the predicate always annotated as one of the trigger words for the frame or are their
predicates which are not associated with any frames. So you potentially can match it to any frame in
the entire FrameNet?

</turn>


<turn speaker="Bishan Yang" timestamp="05:12">

So, There will be words in a sentence that will not trigger any frames.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:17">

Sorry, I didn't clarify my question given a particular predicate, so that's your input and it was
annotated with a particular frame in FrameNet. My question is whether you know this information, you
know that this frame is one of the candidates frames for this predicate or are there cases where the
predicate, can be matched to any frame in the entire lexicon?

</turn>


<turn speaker="Bishan Yang" timestamp="05:39">

I see. Yeah. Yeah. So in the experiment actually I show that. Yeah. This is a good questions in
FrameNet there is a lexicon basically it's a list of words and associated with all the possible
frame types that can be evoked by that verb Oh word not necessarily verb. So, for example the word
"treat" can evoke a cure frame. Like related to medical treatment, it could also evoke a giving
frame. For example she treats herself to a theater, something like that.

</turn>


<turn speaker="Matt Gardner" timestamp="06:19">

Where do these frames come from?

</turn>


<turn speaker="Bishan Yang" timestamp="06:21">

So those frames are manually defined by people who built FrameNet. So they basically defined
thousands of semantic frames that's are, actually FrameNet actually captures most of the frequent
words, I think in English, but still there is a coverage problem. Because if the test sentence has a
word that has never been appeared in FrameNet then maybe the model currently cannot make the
journal.

</turn>


<turn speaker="Matt Gardner" timestamp="06:59">

Yeah. This, this seems like a pretty not very scalable meaning representation. I guess when I think
of semantic role labeling this task, I think syntax or dependency parsing or constituency person is
trying to figure out the structure of the sentence. But the whole point of the structure of the
sentence is to let you know who did what to whom and that's what semantic role labeling is really
trying to get at, the core meaning, the semantics behind the sentence. One issue I think with
FrameNet is that it tries to be too explicit maybe like it tries to define by command this set of
possible things, possible meaning representations that you can have and then you have to like map
into this set. And so this is inherently limited in its scope because there are going to be things
that never were thought of in FrameNet.

</turn>


<turn speaker="Bishan Yang" timestamp="07:53">

Yeah, you're right. But I think in the FrameNet research area, I think people have realized this
problem and people have come up with different type of solution to expand the lexicon for example
and the new way to learn new frames things like that. Yeah, but regarding the other type of semantic
role labeling, PropBank-style semantic role labeling where the semantic roles are very generic like
you only have like age, patient, instrument things like that. I think the advantage of FrameNet is
that it captures much richer semantics than that. So it actually goes to the event level and you can
have all kinds of interesting relation that you can define over FrameNet

</turn>


<turn speaker="Waleed Ammar" timestamp="08:42">

When I think about applications, if I want to use the semantic parse to like feed it as instructions
to automate a certain task, if we can do the FrameNet parsing accurately or like let me say if we
can do both PropBank-style and FrameNet style parsing with the same accuracy, I would rather have
FrameNet parsing because it's much easier to convert the semantic parse into an instruction. So I do
see the value and if you actually care about a particular, like a domain, you can increase the
coverage of FrameNet. You can annotate a bunch of examples specifically for you to compliment this
coverage gap. And I think, I don't think there are many applications where this is going to be a bad
thing.

</turn>


<turn speaker="Matt Gardner" timestamp="09:29">

Yeah, that's totally fair. I wasn't trying to be too hard on FrameNet. I guess you see the same
trade off in knowledge base construction or relation extraction. So we have, I had notions of open
information extraction that just find also it's looking for predicate argument structure really in
sentences, similar to, even this distinction between open information extraction and typical
relation extraction is almost exactly the same distinction that PropBank and FrameNet make.

</turn>


<turn speaker="Bishan Yang" timestamp="09:54">

Yeah. Similar. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="09:56">

And certainly like I'm thinking about semantic parsing these days, not frame semantic parsing but to
an actual formal language. And there you have the same kind of recall trade offs. So, yeah,
certainly I see value in particular applications where you have a formal representation.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:13">

Right. So a question for you Bishan, technically given these differences between how PropBank and
FrameNet defined their semantic parses, what does this mean for the semantic parser? Like is it, can
you do the same thing for both? You mentioned in the paper some interesting differences. For
example, the number of unique roles, semantic roles that are in each of the to frame works.

</turn>


<turn speaker="Bishan Yang" timestamp="10:40">

Yeah, that's a good question. So, in this work, what we found is that with this particular model
they were proposing, this is a joint model that tried to do all these things jointly. It actually
provides more benefits when you apply it to FrameNet versus PropBank. So the same type of model
architecture can be applied to both tasks. But since in FrameNet the semantic constraints are much
richer. So for example, you can have things like given a particular role can only be involved in
certain frames. For example, like fire can only be involved in commercial frames, but not like
treatment frames, for example. You can incorporate these kind of constraints and also in a
particular frame, different roles are also highly dependent. These kinds of dependencies actually
make these joint model more attractive, so in experiments. We also show that the performance gains
on FrameNet is much, much larger than on the ProbBank-style semantic role labeling tasks.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:54">

What do you mean by dependencies between the different arguments in the same frame? Do you mean like
that you have over like the constraints or is there something else?

</turn>


<turn speaker="Bishan Yang" timestamp="12:05">

Oh yeah. So we actually considered four types of constraints. The argument overlapping constraints
are typical constraints that people encoded for semantic role labeling. And there's another one
that's typically used, is like given a frame, the core roles, meaning the roles there necessarily
occur cannot repeat, you can only have one and only one core roles given a frame. These kind of
constraints is within frame constraints. We introduced two additional constraints that can operate
across frames. So an argument then can play roles in different frames, right? And we want them to be
consistent. For example, a person argument cannot the [inaudible] play a person role and like a
weapon row at the same time, right? In different frames. And another new constraint is incorporating
dependencies between frame types and semantic roles. As I said before in FrameNet, there's this
natural constraint that these roles are defined with respect to certain frames so you can constrain
that given the frame there's only these kind of roles that can occur, now the others.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:24">

Well, how do you know that a particular role in one frame like person or like contributor would
contradict with another role in a different frame for the same sentence, like a weapon in a crime.

</turn>


<turn speaker="Bishan Yang" timestamp="13:40">

So currently we just use a very, very simple method because in FrameNet there's no notion of entity
types. So there's no annotation for these types of information. So what we did is that at the very
surface level we look at the names, the naming of these roles. If these roles containe the word
person, then we think that this role actually indicates it's entity type.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:10">

Yeah, that makes sense. Okay. Describe the different components in your model. The sequential and
relational parts.

</turn>


<turn speaker="Bishan Yang" timestamp="14:17">

Sure. So, the sequential model we're referring to is the deep bidirectional LSTM model that has been
recently shown that it is very powerful for the semantic role labeling tasks. I know that you also
implement it in Allen NLP. So this is basically the same model that predicts semantic roles on a
word by word basis. So I think it will break down the phrase level annotation into word level labels
by using this "IOB" tagging, beginning inside and outside of the role.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:53">

And that model conditions on the frame.

</turn>


<turn speaker="Bishan Yang" timestamp="14:56">

Yes, this model is conditioned on the frame type and we add a CRF layer on top that better models
the transition probabilities. So the relational model is basically very simple key for neural
networks that predict a label for a pair of argument span and a predicate. It basically operate at
the span level. It learns or directly learns a representation for an argument span and also a
capture features like dependency path and a word between the argument span and predicate like
incorporate these features to learn a better predictor of the semantic role labels. This is also
conditional on the frame types. So to combine these two models, they have very different
architectures, very different training objectives. I mean one simple way to combine them is, like
okay I trained them jointly, but I did try that didn't find much improvement using that method?
Because the only sharing parameter is in the word embeddings and there's not much constraints
enforcing them, the dependencies between them. So basically the model we propose is to basically
transfer the knowledge from the sequence model to the relational model. So at the end, you still
have a relational model training objective, but you add a regularizer that a KL divergence. Also the
model distribution and the posterior distribution extracted from the sequential model.

</turn>


<turn speaker="Matt Gardner" timestamp="16:46">

So this, this sounds really similar to me to model distillation.

</turn>


<turn speaker="Bishan Yang" timestamp="16:51">

Yeah, yeah, yeah, yeah, you're right. You're right. Yeah, that's inspired by that.

</turn>


<turn speaker="Matt Gardner" timestamp="16:55">

Could you explain the idea of model distillation for people who aren't familiar with it?

</turn>


<turn speaker="Bishan Yang" timestamp="16:59">

So basically for example, when you try to combine different models in a simple way, for example, to
make the, you'll find a model will have better performance, a more efficient way to do that is to,
at the end only train a very smaller model. But the smaller model, you would encourage the smaller
model to have a posterior that's close to the other model,

</turn>


<turn speaker="Matt Gardner" timestamp="17:31">

Right, so if you look at leaderboards these days, at the top of any leader board is a huge ensemble
where we've trained an identical model several times with different random seeds and combined their
predictions at the end. And this gives us better performance because there's a lot of variance in
small details that each of the models picks up on. And so this is all well and good, but if you want
to efficiently run predictions, running this huge ensemble can be really time consuming.

</turn>


<turn speaker="Bishan Yang" timestamp="17:58">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="17:59">

And if you want a prediction on a mobile device, you want the performance of the big ensemble but
the size of a smaller model. So you can do an objective very, very similar to what you did. Right to
get the same performance or similar performance from a much smaller model. It's really fascinating
to me that this even works it says something about our ability to do optimization. Right?

</turn>


<turn speaker="Bishan Yang" timestamp="18:20">

Yeah. So it's kinda like maybe it has a similar appeal to like regularization as well. Yeah, it
works pretty well.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:30">

So just to clarify, so you first train the sequential model.

</turn>


<turn speaker="Bishan Yang" timestamp="18:35">

Yes.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:36">

After you're done with training it, you use it in a KL term to help train the relational model.

</turn>


<turn speaker="Bishan Yang" timestamp="18:43">

The relational model, yes.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:45">

And after the relational model is trained, you no longer need the sequencial model. You don't use it
anymore for inference eventually you only use the relational. Okay.

</turn>


<turn speaker="Bishan Yang" timestamp="18:54">

Yeah. Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:54">

How does it compare to just like averaging the two models or you mentioned also jointly training
them. I'm not sure what you meant by that.

</turn>


<turn speaker="Bishan Yang" timestamp="19:03">

Yeah. So jointly training them just meaning that you directly combine the objective, training
objective of these two models and you optimize, you do gradient descent optimization together. That
doesn't work, it doesn't improve much actually because in this joint model, first of all, the
parameter have much, much more number of parameters and will have the limited training set. And also
because these two training objective does not share much, not much parameter sharing separate
embeddings that's an observation. So using this technique. I would propose we found that it performs
better than both trained sequence model and relational model alone. Yeah. So I'm not sure about what
you mean by averaging two models because these two models output, very different.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:00">

Oh, I just meant after you find the marginal distribution measure for the probability for each role
for a particular span, you can then average this because it's like the same units that you, that
relational model it's predicting.

</turn>


<turn speaker="Bishan Yang" timestamp="20:15">

I see, yeah. Actually I didn't try that. Yeah, I would imagine it would be. Yeah. I actually didn't
try that. That's an interesting point.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:26">

Cool, and I think you also have a part in the paper that describes the frame. How do you, you
predict the frames and then how you integrate.

</turn>


<turn speaker="Bishan Yang" timestamp="20:36">

Yeah. So, for the frame identification it's a very simple straightforward neural network that has
learned feature embedding for like the predicate, the surrounding words dependence things like that.
Use very standard features. So that part we do pretty well. Just the frame identification model
alone. When compared to the existing state-of-the-art comparable. And after that we, since we have
the frame model, identification model and the semantic role labeling model, we formulate a joint
inference objective. So basically trying to find the jointly find the assignment of frame types and
role labels. So it's basically you can treat these as fact to graph you're trying to find a joint
assignment different variables or with respect to some constraints. So the constraints here, I
mentioned before, you have constraints between the frame labels and role labels and between role
labels and these can all be encoded using a framework called AD3 alternating directions deal with
the compensation. So it's basically a tool that can efficiently solve LP relaxation problems. So
yeah, that's how we do the optimization at the end.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:14">

How do you get the set of candidates? So do you, I imagine one possibility would be to get all the
top K candidate frames and then for each of the frames you feed it into the relational model to get
candidate predictions for the arguments? And then you feed all these to the AD3 is that what you do?

</turn>


<turn speaker="Bishan Yang" timestamp="22:35">

Yes. Yeah, you're right. You're right. Yeah. We do youth candidate because in numerating all
possible arguments spans is too expensive. And we do use the top K when describing the experiments.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:51">

Yeah, that makes sense. Cool so what are the main highlights in the experiment results?

</turn>


<turn speaker="Bishan Yang" timestamp="22:56">

So in our first experiments. We first compare the joint, sequential and relational model, with the
sequential model and relational model alone. And we show performance improvements on that as mentor
role labeling. And then we compare this join inference objective where we do the trained
identification as mentoring role labeling jointly. And we get a further boost on performance on
FrameNet.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:28">

So in table two where you describe only the results for arguments, the F1 score you get is 65 and
that's given gold frames, is that right?

</turn>


<turn speaker="Bishan Yang" timestamp="23:41">

Yeah, you're right.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:45">

So in table four where you predict everything. The F1 score is even higher. So how come predicting
the frame give us better results?

</turn>


<turn speaker="Bishan Yang" timestamp="23:51">

Oh yeah. So yeah, the F1 here actually means different things. So, and tabled two the F1 means just
by exactly m,atching the span or only measures the accuracy on the role labels. In table four. The
F1 is combining, it's actually taking into account both the frame type, the frame identification
accuracy and the role labeling accuracy. So on this the frame added verification accuracy is like
almost 90.

</turn>


<turn speaker="Matt Gardner" timestamp="24:26">

So this is, I had a question earlier also. So you have PropBank experiments also, so if I remember
the difference between PropBank and FrameNet is very similar to this notion of like open information
extraction versus closed relation extraction where like we think we know what the frames mean and we
don't really think we don't have a strong notion of what the PropBank roles mean. And you say that
adding your constraints on roles where like if I know that something is a weapon, I'm pretty sure
it's not also going to be a person. This helps in FrameNet but it doesn't really help in PropBank.
Right?

</turn>


<turn speaker="Bishan Yang" timestamp="25:06">

Yeah. Because in PropBank I don't have these kind of constraints.

</turn>


<turn speaker="Matt Gardner" timestamp="25:10">

I thought that was kind of interesting actually. Like it shows one of the benefits as Waleed said of
this more closed domain. And that if all you have is a vague notion of agent and patient, where if
you're not familiar with those terms, agent is the thing that does something that typically the
subject of a verb and patient is like the prototypical object of a verb. Things can be objects of
one verb and subjects of another verb without really any trouble. And so if your only information is
at the level of agent and patient, you're going to have a hard time even coming up with any
reasonable constraints. But if I have more information from FrameNet

</turn>


<turn speaker="Bishan Yang" timestamp="25:47">

Yeah, you're right,

</turn>


<turn speaker="Waleed Ammar" timestamp="25:48">

I can do a lot better by imposing these constraints. So yeah, I thought that was really good insight
that you made.

</turn>


<turn speaker="Bishan Yang" timestamp="25:54">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:55">

Yeah. And I think that's in part why this task is feasible. Right? It's like I think FrameNet is
much smaller in number of training instances then a PropBank.

</turn>


<turn speaker="Bishan Yang" timestamp="26:07">

Yeah. Yeah, you are right.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:10">

It's kind of surprising to me that's where you were even able to achieve 65% on argument. Well,
yeah, I mean of course it's not great still, but yeah, that's interesting. Right? So you have any
last thoughts you'd like to mention before we conclude?

</turn>


<turn speaker="Bishan Yang" timestamp="26:25">

No, I think we pretty much cover everything that I want.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:30">

All right. Bishan, it has been a good pleasure talking to you. Thank you very much for being on the
podcast.

</turn>


<turn speaker="Bishan Yang" timestamp="26:36">

Yeah, thanks very much for having me.

</turn>
