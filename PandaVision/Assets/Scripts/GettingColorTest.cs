using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;

public class GettingColorTest : MonoBehaviour
{
    // Class of color things
    [System.Serializable]
    public class Color
    {
        public int id;
        public int red;
        public int green;
        public int blue;
        public string correctAnswer;
        public string incrorrectAnswerA;
        public string incrorrectAnswerB;
        public string incrorrectAnswerC;
    }
    // List to store all colors which were got from db
    private List<Color> colors;

    // Mehtod to get colors from db
    IEnumerator GetColor()
    {
        UnityWebRequest www = UnityWebRequest.Get("http://192.168.0.165:5000/color_test"); // connect with db
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success) // checking connection
        {
            Debug.LogError(www.error);
        }
        else
        {
            string json = www.downloadHandler.text; // downloanding whole json file from API
            colors = JsonConvert.DeserializeObject<List<Color>>(json);  // converting json to list with dictionaries
        }
    }

    // Main method
    IEnumerator Start()
    {
        yield return StartCoroutine(GetColor());

        foreach (var item in colors)
        {
            Debug.Log($"ID: {item.id}, Red: {item.red}, Green: {item.green}, Blue: {item.blue}, Poprawna: {item.correctAnswer}, A: {item.incrorrectAnswerA}, B: {item.incrorrectAnswerB}, C: {item.incrorrectAnswerC}");
        }
    }
}
