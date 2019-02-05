using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Create : MonoBehaviour {


    public GameObject block;
    public int size = 500;
    public float speed = 0.1f;
    public float zoom_speed=1;
    public GameObject[] platform_objects;



    private GameObject[,] matrix;
    Camera cam;
    Transform tr;
    int platform_object_index = 0;
	// Use this for initialization
	void Start () {
        tr = GetComponent<Transform>();
        cam = GetComponent<Camera>();
        matrix = new GameObject[size,size];
	}
	//void touchNumber(string num)
 //   {
 //       if (Input.GetKey(num))
 //       {
 //           platform_object_index = int.Parse(num);
 //       }
 //   }

    void SelectPlatformObj()
    {
        int[] numbers = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
        Action<string> touchNumber=(string n) => {
            if (Input.GetKey(n))
            {
                platform_object_index = int.Parse(n);
            }
        };
        foreach(int n in numbers)
        {
            touchNumber(n.ToString());
        }    
    }
	// Update is called once per frame
	void Update () {
        Vector3 pz = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        pz.z = 0;
        //print(pz);
        float x, y;
        x = Mathf.Floor(pz.x + 0.25f);
        y = Mathf.Floor(pz.y + 0.25f);

        SelectPlatformObj();



        if (Input.GetMouseButton(0))
        {
            
            
            
            if (x>=0 && x<size && y >=0 && y < size && matrix[(int)x,(int)y]==null)
            {
                GameObject obj = Instantiate(platform_objects[platform_object_index]);
                obj.transform.position = new Vector2(x, y);
                print("click:" + obj.transform.position);
                matrix[(int)obj.transform.position.x, (int)obj.transform.position.y] = obj;
            }
            
        }
        

        if (Input.GetKey("e"))
        {
            if (x >= 0 && x < size && y >= 0 && y < size && matrix[(int)x, (int)y] != null)
            {
                Destroy(matrix[(int)x, (int)y]);
            }
        }
        if (Input.GetMouseButton(1))
        {
            cam.orthographicSize = cam.orthographicSize + Input.GetAxis("Mouse Y") * zoom_speed;
        }

        if (Input.GetKey("d"))
        {
            tr.Translate(new Vector3(speed, 0, 0));
        }
        if (Input.GetKey("a"))
        {
            tr.Translate(new Vector3(-speed, 0, 0));
        }
        if (Input.GetKey("w"))
        {
            tr.Translate(new Vector3(0, speed, 0));
        }
        if (Input.GetKey("s"))
        {
            tr.Translate(new Vector3(0, -speed, 0));
        }


    }
}
