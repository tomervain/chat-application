const config = require('config');
const { Client } = require('@elastic/elasticsearch');

const esConfig = config.get('elasticsearch');

class ElasticsearchService {
    constructor() {
        let host = esConfig.node.host;
        let port = esConfig.node.port;
        this.client = new Client({ node: `http://${host}:${port}` });
    }

    async saveQuestionAndAnswer(question, answer) {
        await this.client.index({
            index: esConfig.index,
            document: {
                question: question,
                answer: answer
            }
        });

        await this.client.indices.refresh({ index: esConfig.index });
    }

    async lookForAnswer(question) {
        const results = await this.client.search({
            index: esConfig.index,
            query: { match_phrase: { question: question } }
        });

        if (results.hits.total.value === 0)
            return null;
        
        if (results.hits.hits[0]._score < 0.5)
            return null; // probably not related to question 
        
        return results.hits.hits[0]._source.answer;
    }
}

exports.ElasticsearchService = ElasticsearchService;