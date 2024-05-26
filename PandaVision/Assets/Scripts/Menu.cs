using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Menu : MonoBehaviour
{
    public List<Test> tests = new List<Test>();

    // Start is called before the first frame update
    void Start()
    {
        tests.Add(new ColorTest());
        tests.Add(new ColorCubeTest());

        foreach(Test test in tests)
        {
            test.description();
        }
    }
}
