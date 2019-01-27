using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour {
    private Rigidbody rb;
    private Transform tr;
	// Use this for initialization
	void Start () {
        tr = GetComponent<Transform>();
        rb = GetComponent<Rigidbody>();
	}
	
	// Update is called once per frame
	void Update () {

        if (Input.GetKey("a"))
        {
            rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, 2);
            tr.rotation = Quaternion.AngleAxis(-90, new Vector3(0, 1, 0));
        }
        if (Input.GetKey("d"))
        {
            rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, -2);
            tr.rotation = Quaternion.AngleAxis(90, new Vector3(0, 1, 0));
        }
        if (Input.GetKey("w"))
        {
            rb.velocity = new Vector3(2, rb.velocity.y, rb.velocity.z);
            tr.rotation = Quaternion.AngleAxis(0,new Vector3(0,0,0));
        }
        if (Input.GetKey("s"))
        {
            rb.velocity = new Vector3(- 2, rb.velocity.y, rb.velocity.z);
            tr.rotation = Quaternion.AngleAxis(180, new Vector3(0, 1, 0));
        }
        


    }
}
