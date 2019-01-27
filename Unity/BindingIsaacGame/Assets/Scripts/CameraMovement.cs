using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMovement : MonoBehaviour {
    public GameObject player;
    Transform tr;
    public float zoom = -10;
	// Use this for initialization
	void Start () {
        tr = GetComponent<Transform>();
	}
	
	// Update is called once per frame
	void Update () {
        tr.position = new Vector3(player.transform.position.x, player.transform.position.y, zoom); 
	}
}
