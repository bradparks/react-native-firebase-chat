'use strict';

import * as types from './actionTypes';
import FirebaseService from '../services/firebase';

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(sessionLoading());

    let firebaseService = new FirebaseService();
    firebaseService.app.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        dispatch(sessionError(error.message));
      });

    let unsubscribe = firebaseService.app.auth()
      .onAuthStateChanged(function(user) {
        if (user) {
          dispatch(sessionSuccess(user));
          unsubscribe();
        } else {
          dispatch(sessionLogout());
          unsubscribe();
        }
      });
  }
}

export function signupUser(email, password) {
  return (dispatch) => {
    dispatch(sessionLoading());

    let firebaseService = new FirebaseService();
    firebaseService.app.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        dispatch(sessionError(error.message));
      });

    let unsubscribe = firebaseService.app.auth()
      .onAuthStateChanged(function(user) {
        if (user) {
          dispatch(sessionSuccess(user));
          unsubscribe();
        } else {
          dispatch(sessionLogout());
          unsubscribe();
        }
      });
  }
}

export function sessionLoading() {
  return {
    type: types.SESSION_LOADING,
  }
}

export function sessionSuccess(user) {
  return {
    type: types.SESSION_SUCCESS,
    user,
  }
}

export function sessionError(error) {
  return {
    type: types.SESSION_ERROR,
    error,
  }
}

export function sessionLogout() {
  return {
    type: types.SESSION_LOGOUT,
  }
}
