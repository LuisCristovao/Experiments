using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Create : MonoBehaviour {


    public GameObject block;
    public int size = 500;
    private GameObject[,] matrix;
	// Use this for initialization
	void Start () {
        matrix = new GameObject[size,size];
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
            
            
            
            if (x>=0 && x<size && y >=0 && y < size && matrix[(int)x,(int)y]==null)
            {
                GameObject obj = Instantiate(block);
                obj.transform.position = new Vector2(x, y);
                print("click:" + obj.transform.position);
                matrix[(int)obj.transform.position.x, (int)obj.transform.position.y] = obj;
            }
            
        }
        if (Input.GetMouseButton(1))
        {
            GetComponent<Camera>().orthographicSize += Input.GetAxis("Mouse Y");
            transform.position = new Vector3(transform.position.x+Input.GetAxis("Mouse X"), transform.position.y+Input.GetAxis("Mouse Y"),-10);
        }

        if (Input.GetKey("e"))
        {
            if (x >= 0 && x < size && y >= 0 && y < size && matrix[(int)x, (int)y] != null)
            {
                Destroy(matrix[(int)x, (int)y]);
            }
        }



    }
}
