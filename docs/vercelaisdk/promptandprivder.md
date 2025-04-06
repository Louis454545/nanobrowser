# Foundations: Providers and Models
[Foundations](https://sdk.vercel.ai/docs/foundations)Providers and Models

Companies such as OpenAI and Anthropic (providers) offer access to a range of large language models (LLMs) with differing strengths and capabilities through their own APIs.

Each provider typically has its own unique method for interfacing with their models, complicating the process of switching providers and increasing the risk of vendor lock-in.

To solve these challenges, AI SDK Core offers a standardized approach to interacting with LLMs through a [language model specification](https://github.com/vercel/ai/tree/main/packages/provider/src/language-model/v1) that abstracts differences between providers. This unified interface allows you to switch between providers with ease while using the same API for all providers.

Here is an overview of the AI SDK Provider Architecture:

![](https://sdk.vercel.ai/_next/image?url=%2Fimages%2Fai-sdk-diagram.png&w=1920&q=75&dpl=dpl_Eg8h4hKMtx3QDfJu1Xi8X64Dp66g)![](https://sdk.vercel.ai/_next/image?url=%2Fimages%2Fai-sdk-diagram-dark.png&w=1920&q=75&dpl=dpl_Eg8h4hKMtx3QDfJu1Xi8X64Dp66g)

[AI SDK Providers](#ai-sdk-providers)
-------------------------------------

The AI SDK comes with a wide range of providers that you can use to interact with different language models:

*   [xAI Grok Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/xai) (`@ai-sdk/xai`)
*   [OpenAI Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/openai) (`@ai-sdk/openai`)
*   [Azure OpenAI Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/azure) (`@ai-sdk/azure`)
*   [Anthropic Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic) (`@ai-sdk/anthropic`)
*   [Amazon Bedrock Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock) (`@ai-sdk/amazon-bedrock`)
*   [Google Generative AI Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai) (`@ai-sdk/google`)
*   [Google Vertex Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/google-vertex) (`@ai-sdk/google-vertex`)
*   [Mistral Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/mistral) (`@ai-sdk/mistral`)
*   [Together.ai Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/togetherai) (`@ai-sdk/togetherai`)
*   [Cohere Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/cohere) (`@ai-sdk/cohere`)
*   [Fireworks Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/fireworks) (`@ai-sdk/fireworks`)
*   [DeepInfra Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/deepinfra) (`@ai-sdk/deepinfra`)
*   [DeepSeek Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/deepseek) (`@ai-sdk/deepseek`)
*   [Cerebras Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/cerebras) (`@ai-sdk/cerebras`)
*   [Groq Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/groq) (`@ai-sdk/groq`)
*   [Perplexity Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/perplexity) (`@ai-sdk/perplexity`)

You can also use the [OpenAI Compatible provider](https://sdk.vercel.ai/providers/openai-compatible-providers) with OpenAI-compatible APIs:

*   [LM Studio](https://sdk.vercel.ai/providers/openai-compatible-providers/lmstudio)
*   [Baseten](https://sdk.vercel.ai/providers/openai-compatible-providers/baseten)

Our [language model specification](https://github.com/vercel/ai/tree/main/packages/provider/src/language-model/v1) is published as an open-source package, which you can use to create [custom providers](https://sdk.vercel.ai/providers/community-providers/custom-providers).

The open-source community has created the following providers:

*   [Ollama Provider](https://sdk.vercel.ai/providers/community-providers/ollama) (`ollama-ai-provider`)
*   [ChromeAI Provider](https://sdk.vercel.ai/providers/community-providers/chrome-ai) (`chrome-ai`)
*   [FriendliAI Provider](https://sdk.vercel.ai/providers/community-providers/friendliai) (`@friendliai/ai-provider`)
*   [Portkey Provider](https://sdk.vercel.ai/providers/community-providers/portkey) (`@portkey-ai/vercel-provider`)
*   [Cloudflare Workers AI Provider](https://sdk.vercel.ai/providers/community-providers/cloudflare-workers-ai) (`workers-ai-provider`)
*   [OpenRouter Provider](https://sdk.vercel.ai/providers/community-providers/openrouter) (`@openrouter/ai-sdk-provider`)
*   [Crosshatch Provider](https://sdk.vercel.ai/providers/community-providers/crosshatch) (`@crosshatch/ai-provider`)
*   [Mixedbread Provider](https://sdk.vercel.ai/providers/community-providers/mixedbread) (`mixedbread-ai-provider`)
*   [Voyage AI Provider](https://sdk.vercel.ai/providers/community-providers/voyage-ai) (`voyage-ai-provider`)
*   [Mem0 Provider](https://sdk.vercel.ai/providers/community-providers/mem0)(`@mem0/vercel-ai-provider`)
*   [Spark Provider](https://sdk.vercel.ai/providers/community-providers/spark) (`spark-ai-provider`)
*   [AnthropicVertex Provider](https://sdk.vercel.ai/providers/community-providers/anthropic-vertex-ai) (`anthropic-vertex-ai`)
*   [LangDB Provider](https://sdk.vercel.ai/providers/community-providers/langdb) (`@langdb/vercel-provider`)

[Self-Hosted Models](#self-hosted-models)
-----------------------------------------

You can access self-hosted models with the following providers:

*   [Ollama Provider](https://sdk.vercel.ai/providers/community-providers/ollama)
*   [LM Studio](https://sdk.vercel.ai/providers/openai-compatible-providers/lmstudio)
*   [Baseten](https://sdk.vercel.ai/providers/openai-compatible-providers/baseten)

Additionally, any self-hosted provider that supports the OpenAI specification can be used with the [OpenAI Compatible Provider](https://sdk.vercel.ai/providers/openai-compatible-providers) .

[Model Capabilities](#model-capabilities)
-----------------------------------------

The AI providers support different language models with various capabilities. Here are the capabilities of popular models:

This table is not exhaustive. Additional models can be found in the provider documentation pages and on the provider websites.