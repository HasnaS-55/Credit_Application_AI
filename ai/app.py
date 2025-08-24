from flask import Flask, request, jsonify 
from flask_cors import CORS




app = Flask(__name__)
CORS(app)


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({ "message": "OK"}), 200


@app.route('/api/evaluate-credit' methods=['POST'])
def evaluate_credit():
    try:
        data = request.json

    except Exception as e:
        return jsonify({ "error": str(e)}), 500
    


if __name__ == '__main__':
    app.run(debug=True, port=5000)