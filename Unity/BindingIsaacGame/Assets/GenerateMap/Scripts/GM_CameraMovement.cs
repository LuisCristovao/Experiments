using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GM_CameraMovement : MonoBehaviour {
    Transform tr;
    Camera cam;

    public GameObject block;
    public int size = 500;
    public float speed = 0.1f;
    public float mouse_speed = 1;

    GameObject[,] matrix;
	// Use this for initialization
	void Start () {
        matrix = new GameObject[size, size];
        cam = GetComponent<Camera>();
        tr = GetComponent<Transform>();
	}
	
	// Update is called once per frame
	void Update () {


        Vector3 pz = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        pz.z = 0;
        //print(pz);
        float x, y;
        x = Mathf.Floor(pz.x + 0.25f);
        y = Mathf.Floor(pz.y + 0.25f);
        if (Input.GetMouseButton(0))
        {



            if (x >= 0 && x < size && y >= 0 && y < size && matrix[(int)x, (int)y] == null)
            {
                GameObject obj = Instantiate(block);
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
            cam.orthographicSize = cam.orthographicSize + Input.GetAxis("Mouse Y")*mouse_speed;
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
            tr.Translate(new Vector3(0,speed,0));
        }
        if (Input.GetKey("s"))
        {
            tr.Translate(new Vector3(0, -speed, 0));
        }
    }
}
