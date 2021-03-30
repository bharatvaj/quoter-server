const quote = require("./model/common/quote_pb");
const quotes = require("./model/common/quotes_pb");


function getQuotes(rows) {
    return new Promise((resolve, reject) => {
        qs = new quotes.Quotes();
        qarr = [];
        for (row of rows) {
            q = new quote.Quote();
            q.setQuote(row.quote);
            q.setId(row.id);
            q.setAuthor(row.author);
            q.setTagsList(row.tags);
            qarr.push(q);
        }
        qs.setQuotesList(qarr);
        resolve(qs);
    });
}

module.exports = {
    getQuotes
};