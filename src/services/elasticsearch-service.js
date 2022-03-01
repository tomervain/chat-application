const { Client } = require('@elastic/elasticsearch');

const NODE = 'http://localhost:9200';
const INDEX = 'chatapp'

class ElasticsearchService {
    constructor() {
        this.client = new Client({ node: NODE })
    }

    async saveQuestionAndAnswer(question, answer) {
        await this.client.index({
            index: INDEX,
            document: {
                question: question,
                answer: answer
            }
        });

        await this.client.indices.refresh({ index: INDEX });
    }

    async lookForAnswer(question) {
        const results = await this.client.search({
            index: INDEX,
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