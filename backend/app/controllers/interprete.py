from flask import Flask, request, jsonify
import sys
import io
import contextlib

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False

@app.route('/run-code', methods=['POST'])
def run_code():
    data = request.json
    code = data.get('code', '')

    output = io.StringIO()

    try:
        with contextlib.redirect_stdout(output):
            exec(code, {'__builtins__': {}})
        result = output.getvalue()
    except Exception as e:
        result = str(e)

    return jsonify({'output': result})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
