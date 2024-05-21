using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;  // Install Newtonsoft.Json from the Unity Asset Store

public class GettingColorTest : MonoBehaviour
{
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

    Dictionary<string, int> test = new Dictionary<string, int>();

    [System.Serializable]
    public class ColorList
    {
        public List<Color> colors;
    }

    void Start()
    {
        StartCoroutine(GetColor());
    }

    IEnumerator GetColor()
    {
        UnityWebRequest www = UnityWebRequest.Get("http://192.168.0.165:5000/color_test");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(www.error);
        }
        else
        {
            string json = www.downloadHandler.text;
            List<Color> data = JsonConvert.DeserializeObject<List<Color>>(json);
            ProcessColor(data);
        }
    }

    void ProcessColor(List<Color> data)
    {
        foreach (var item in data)
        {
            Debug.Log($"ID: {item.id}, Red: {item.red}, Green: {item.green}, Blue: {item.blue}, Poprawna: {item.correctAnswer}, A: {item.incrorrectAnswerA}, B: {item.incrorrectAnswerB}, C: {item.incrorrectAnswerC}");
        }
    }
}
