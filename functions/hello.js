exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'taeila',
      age: 54,
      email: 'kim920125@naver.com'
    })
  }
}