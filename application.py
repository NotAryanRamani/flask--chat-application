from chatapp import app, socketio, db
import os 

if __name__ == '__main__':
    if not os.path.exists('instance/ChatApp.db'):
        with app.app_context():
            db.create_all()
    socketio.run(app, debug=True)
    # socketio.run(app, host='0.0.0.0', port=8080)